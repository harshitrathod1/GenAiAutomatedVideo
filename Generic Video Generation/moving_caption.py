from moviepy.editor import VideoFileClip, concatenate_videoclips, TextClip, CompositeVideoClip, AudioFileClip , CompositeAudioClip , ColorClip , vfx , ImageClip , AudioClip , concatenate_audioclips
from gtts import gTTS
import os
import pyttsx3
import edge_tts
import asyncio
import math
import whisper
from timed_caption_generator import generate_timed_captions
from gcp_tts import convert_text_to_speech
from vid_transition import addVideoTransition
import argparse
from script_Generation.generator import generate_script
import time
from imageGeneration.imageGenerator import generate_image
from clipsGeneration.clipGenerator import generate_vid


async def generate_voiceover1(voiceover_text , output_audio_path):
    convert_text_to_speech(voiceover_text , output_audio_path)


def generate_timed_caption(final_audio):
    model = whisper.load_model("base")
    result = model.transcribe(final_audio , word_timestamps = True)
    segments  = result['segments']
    return segments




def adjust_audio_duration(audio, target_duration):
    """
    Adjust the audio speed to match the target duration.
    
    Args:
    audio (AudioFileClip): The audio clip to adjust.
    target_duration (float): The target duration to match (in seconds).
    
    Returns:
    AudioFileClip: The audio clip with adjusted duration.
    """
    # audio_duration = audio.duration
    # speed_factor = target_duration / audio_duration
    # return audio.fx(vfx.speedx, speed_factor)
    if audio.duration <= target_duration:
        return audio 
    return audio.set_duration(target_duration)

def adjust_video_duration(audio , video):
    audioDuration = audio.duration
    videoDuration = video.duration
    print(audioDuration ," " , videoDuration)

    if audioDuration <= videoDuration :
        # video = video.subclip(0 , audioDuration)
        extra_noise = AudioFileClip('extra_noise.mp3')
        extra_noise = extra_noise.set_duration(videoDuration)
        final_audio = CompositeAudioClip([extra_noise , audio])
        video = video.set_audio(final_audio)
        return video

    nums_loops = int(audioDuration // videoDuration) + 1
    video_clips = [video] * nums_loops 
    video_clip_final = []
    for i , video in enumerate(video_clips):
        if i > 0 :
            video = video.fadein(1)
        if i ==len(video_clips) - 1 : 
            video = video.fadeout(1)
        video_clip_final.append(video)

    extended_video = concatenate_videoclips(video_clip_final)

    extended_video = extended_video.subclip(0 , audioDuration) 
    extended_video = extended_video.set_audio(audio)
    return extended_video


def split_text_by_words(text  , words_per_sec):
    # Split text into words
    words = text.split()
    # Group words into chunks of the specified size
    chunks = [' '.join(words[i:i+words_per_sec]) for i in range(0, len(words), words_per_sec)]
    return chunks

def getTimedCaptions(caption_text , video):
    total_words = len(caption_text.split())
    word_per_second = math.ceil((total_words * 2) / 4)
    text_chunks = split_text_by_words(caption_text ,  word_per_second)
    video_width = video.size[0]
    clips = []
    bg = []

     # Create a text clip for each chunk and set its duration to 1 second
    prev = 0 
    for i, chunk in enumerate(text_chunks):
        txt_clip = TextClip(chunk, fontsize=70, color='white' , method='caption' , size = (video_width*0.8,None) , font = "Lane", bg_color="black")
        txt_clip = txt_clip.set_duration(2).set_start(prev)
        prev += 2
        txt_clip = txt_clip.set_pos(('center' , 'bottom'))
        txt_clip = txt_clip.margin(top=20 , bottom=260,left =20 , right=20,opacity=0)
        text_width,text_height = txt_clip.size 
        color_clip = ColorClip(size = (text_width + 30 , text_height + 30) , color=(100,0,0))
        color_clip = color_clip.set_pos(('center' , 'bottom'))
        color_clip = color_clip.margin(top=20 , bottom=300,left =20 , right=20,opacity=0)
        color_clip = color_clip.set_duration(2).set_start(prev)
        bg.append(color_clip)
        clips.append(txt_clip)
 
    return clips , bg


def addTransitionUtility(final_clips):
    # We have clips , first save these clips to local storage 
    clips_to_add = []
    for i , clip in enumerate(final_clips):
        print(clip)
        outputfileName = f"clips/clips_{i}.mp4"
        clip.write_videofile(outputfileName , codec='libx264' , audio_codec='aac')
    
    video_files = []
    directory = 'clips'
    for file in os.listdir(directory):
        video_files.append(os.path.join(directory , file))
    video_files.sort() 
    print(f'Video Files - {video_files}')
    for i , file in enumerate(video_files):
        # print(i)
        # print(len(video_files))
        if i < len(video_files) - 1 : 
            clip1_loc = video_files[i]
            clip2_loc = video_files[i+1]
            dest_name = f"clips/clip{i}_trans"
            phase_in_name = dest_name + f"_phase1.mp4"
            phase_out_name = dest_name + f"_phase2.mp4"
            print(clip1_loc , clip2_loc)
            addVideoTransition([clip1_loc , clip2_loc] , 'zoom_in' , dest_name)
            clips_to_add.append(clip1_loc)
            clips_to_add.append(phase_in_name)
            clips_to_add.append(phase_out_name)
        if i == len(video_files) - 1:
            clips_to_add.append(video_files[i])
            

    v_files = []
    final_files = []
    for i , clips_path in enumerate(clips_to_add):
        if "phase1" in clips_path:
            phase_in = VideoFileClip(clips_path , audio = False)
            phase_out = VideoFileClip(clips_to_add[i+1] , audio = False)
            print("---------video loc--------------")
            print(phase_in)
            print(phase_out)
            merged_vid = concatenate_videoclips([phase_in, phase_out] , method = 'compose') 
            merged_output_name = f"clips/merged_{i - 1}.mp4"
            swoosh_audio = AudioFileClip("music/swoosh_music.mp3")
            if swoosh_audio.duration > merged_vid.duration:
                swoosh_audio = swoosh_audio.set_duration(merged_vid.duration)
            
            merged_vid = merged_vid.set_audio(swoosh_audio)
            merged_vid.write_videofile(merged_output_name , codec = "libx264" , audio_codec='aac')

            final_files.append(VideoFileClip(merged_output_name))
        
        elif ("phase1" not in clips_path) and ("phase2" not in clips_path):
            final_files.append(VideoFileClip(clips_path))

    return final_files 



def resize_clip(clip, target_width = 1080, target_height = 1920):
    # Calculate the new size while maintaining aspect ratio
    clip_resized = clip.resize(height=target_height)  
    if clip_resized.w < target_width: 
        clip_resized = clip_resized.margin(left=(target_width - clip_resized.w) // 2,
                                           right=(target_width - clip_resized.w) // 2,
                                           color=(0, 0, 0))  
    return clip_resized

def merge_video_with_text_and_voiceover(video_clips , voiceover_texts  , output_path , add_voiceover = False):
    clips = []

    for i,video_path in enumerate(video_clips):
        video = VideoFileClip(video_path)
        adjusted_video = video
        video_with_audio = video


        if add_voiceover:
            voiceover_path = f"voiceover_{i}.mp3"
            asyncio.run(generate_voiceover1(voiceover_texts[i], voiceover_path))
            audio = AudioFileClip(voiceover_path)
            video_with_audio = adjust_video_duration(audio , video)
        clips.append(video_with_audio)
    
    final_scene = VideoFileClip("videos/finalScene.mp4") 
    image_clip_front = ImageClip("videos/front_scene.png").set_duration(2)
    image_clip_front = resize_clip(image_clip_front)
    final_scene = resize_clip(final_scene)
    final_scene = final_scene.set_audio(None)
    # clips.append(final_scene)
    final_clip = [] 
    # # fade in fade out
    for i , clip in enumerate(clips):
        clip = resize_clip(clip)
        final_clip.append(clip)
    # final_clip.append(final_scene)

    v_files = addTransitionUtility(final_clip)
    v_files.append(final_scene)
    v_files.insert(0 , image_clip_front)

    final_video = concatenate_videoclips(v_files, method='compose')
    background_audio = AudioFileClip('music/compressed_audio.mp3')
    background_audio = background_audio.volumex(0.2)
    background_audio = background_audio.set_duration(final_video.duration)
    final_audio = CompositeAudioClip([final_video.audio , background_audio])
    final_video = final_video.set_audio(final_audio)
    final_video.write_videofile("INT_MED.mp4", codec='libx264', audio_codec='aac')
    audio_file = "extracted_audio.wav"
    vc = VideoFileClip("INT_MED.mp4")
    vc.audio.write_audiofile(audio_file)
    segments = generate_timed_caption(audio_file)
    text_clips = []
    for segment in segments:
        words = segment["words"]

        for i in range(0 , len(words) , 3):
            chunk = words[i:i+3]
            chunk_text = ' '.join(word_info['word'] for word_info in chunk)
            start_time = chunk[0]['start']
            end_time = chunk[-1]['end']
            chunk_text = chunk_text.upper()
            chunk_clip = (TextClip(
                chunk_text,
                fontsize = 100,
                color = 'white',
                method = 'caption',
                size = (final_video.size[0] * 0.8,None),
                font = "Poppins-ExtraBold",
                stroke_color = "black",
                stroke_width = 3
            ))
            chunk_clip = chunk_clip.set_start(start_time).set_duration(end_time-start_time)
            chunk_clip = chunk_clip.set_pos(('center' , 'bottom'))
            chunk_clip = chunk_clip.margin(top=20 , bottom=350 , left =20 , right=20,opacity=0)
            text_clips.append(chunk_clip)

    
        
    final_video = CompositeVideoClip([final_video  ,  *text_clips])
    final_video.write_videofile(output_path, codec='libx264', audio_codec='aac')


    for i in range(len(video_clips)):
        os.remove(f"voiceover_{i}.mp3")

    #cleaning up 
    cwd = os.getcwd()

    path_to_clips = f"{cwd}/clips"

    if os.path.exists(path_to_clips):
        for item in os.listdir(path_to_clips):
            item_path = os.path.join(path_to_clips , item)
            # print(item_path)
            if os.path.isfile(item_path):
                os.remove(item_path)


video_clips = ['videos/Scene1.mp4', 'videos/Scene2.mp4', 'videos/Scene3.mp4' , 'videos/Scene4.mp4' , 'videos/Scene5.mp4']


output_path = 'final_output_video.mp4'




def entryFunction(TOPIC):

    print("--------------------- STEP 1 : GENERATING SCENES FOR TOPIC -------------\n\n")

    generated_script = generate_script(TOPIC) 
    content = generated_script["script"]
    print(content)
    # exit(0)
    imageGenerationPrompt = generated_script["imageGenerationPrompt"]
    videoGenerationPrompt = generated_script["videoGenerationPrompt"]

    print("-------- Generated content--------\n")
    print(content)

    print("\n\n----- Image generation prompt-----------\n")
    print(imageGenerationPrompt)

    print("\n\n------- Video generation prompt-----------\n")
    print(videoGenerationPrompt)

    print("\n\n--------------- STEP 1 DONE---------------\n")


    print("\n\n--------- STEP 2 :  Generating Image --------------\n")
    generate_image(imageGenerationPrompt)
    print("\n\n--------- STEP 2 : Completed --------------\n")

    print("\n\n---------- STEP 3 : Clips Generation ---------\n ")
    generate_vid(videoGenerationPrompt)
    print("\n\n--------- STEP 3 : Completed --------------\n")

    print("\n\n---------- STEP 4 : Creating Video , adding transitions , Voiceover and Captions---------\n\n")

    voiceover_texts = [scene_data['voiceOverText'] for scene_data in content.values()]

    merge_video_with_text_and_voiceover(video_clips, voiceover_texts, output_path , True)

    print("\n---------------- ALL STEPS COMPLETED ---------------------\n")

    return {
        "status": "success"
    }






    


