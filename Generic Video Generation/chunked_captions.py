from moviepy.editor import VideoFileClip, concatenate_videoclips, TextClip, CompositeVideoClip, AudioFileClip , CompositeAudioClip , ColorClip , vfx
from gtts import gTTS
import os
import pyttsx3
import edge_tts
import asyncio
import math

async def generate_voiceover1(voiceover_text , output_audio_path):
    communicate = edge_tts.Communicate(voiceover_text,"en-IN-PrabhatNeural")
    await communicate.save(output_audio_path)


def generate_voiceover(voiceover_text , output_audio_path):
    print(voiceover_text)
    tts = gTTS(text=voiceover_text, lang='hi')
    tts.save(output_audio_path)
    # engine = pyttsx3.init()

    # # Set speech rate (increase for cheerful mood)
    # engine.setProperty('rate', 180)  # Speed it up slightly

    
    # # Set volume (optional, could make it louder)
    # engine.setProperty('volume', 1.0)  # Max volume

    # # Set pitch (pyttsx3 does not directly support pitch, but you can choose voices)
    # voices = engine.getProperty('voices')
    # for voice in voices:
    #     print(voice)
    #     if "Indian" in voice.name:  # Example for choosing an Indian English accent
    #         engine.setProperty('voice', voice.id)
    #         break

    # # Save voiceover to file
    # engine.save_to_file(voiceover_text, output_audio_path)
    # engine.runAndWait()




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
        return video

    nums_loops = int(audioDuration // videoDuration) + 1
    video_clips = [video] * nums_loops 

    extended_video = concatenate_videoclips(video_clips)

    extended_video = extended_video.subclip(0 , audioDuration) 
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
        txt_clip = TextClip(chunk, fontsize=50, color='white' , method='caption' , size = (video_width*0.8,None) , font = "Lane", bg_color="black")
        txt_clip = txt_clip.set_duration(2).set_start(prev)
        prev += 2
        txt_clip = txt_clip.set_pos(('center' , 'bottom'))
        txt_clip = txt_clip.margin(top=20 , bottom=300,left =20 , right=20,opacity=0)
        text_width,text_height = txt_clip.size 
        color_clip = ColorClip(size = (text_width + 30 , text_height + 30) , color=(100,0,0))
        color_clip = color_clip.set_pos(('center' , 'bottom'))
        color_clip = color_clip.margin(top=20 , bottom=300,left =20 , right=20,opacity=0)
        color_clip = color_clip.set_duration(2).set_start(prev)
        bg.append(color_clip)
        clips.append(txt_clip)
 
    return clips , bg





def merge_video_with_text_and_voiceover(video_clips , voiceover_text , text_overlay , output_path , add_voiceover = False):
    clips = []

    for i,video_path in enumerate(video_clips):
        video = VideoFileClip(video_path)
        video = video.fx(vfx.speedx , factor=1.25)

        text = TextClip(text_overlay[i] , fontsize=50 , color = 'white' ,  font="Arial")

        # Set the duration of the text clip to match the video's duration
        text = text.set_duration(video.duration)
        # text = text.set_pos("center").fadein(1).fadeout(1)
        # text = text.set_duration(video.duration).set_position(('center','bottom'))

        # Create a black background for the text, matching the size of the text
        text_width, text_height = text.size
        black_background = ColorClip(size=(text_width + 20, text_height + 10), color=(0, 0, 0))
        
        # Set duration of the black background to match the text clip
        black_background = black_background.set_duration(video.duration)

        # Position the black background behind the text (slightly larger for padding)
        black_background = black_background.set_pos(('center', 'bottom'))
        black_background = black_background.set_opacity(0.8)

        # Position the text on top of the black background
        text = text.set_pos(('center', 'top'))

        text = text.margin(top=125 , bottom=20,left =20 , right=20,opacity=0)
        # text = text.resize(width=text.w * 1.5)
        adjusted_video = video
        video_with_audio = video


        if add_voiceover:
            voiceover_path = f"voiceover_{i}.mp3"
            asyncio.run(generate_voiceover1(voiceover_texts[i], voiceover_path))
            audio = AudioFileClip(voiceover_path)
            adjusted_video = adjust_video_duration(audio , video)

                # Adjust the audio duration to fit the video duration
                # adjusted_audio = adjust_audio_duration(audio, video.duration)
            video_with_audio = adjusted_video.set_audio(audio)
        textClips , bg = getTimedCaptions(text_overlay[i] , video_with_audio)
        print(bg)
        video_with_text = CompositeVideoClip([video_with_audio ,  *textClips])
        clips.append(video_with_text)

    print(clips)
    final_clip = [] 
    for i , clip in enumerate(clips):
        if i > 0 :
            clip = clip.fadein(1)
        if i < len(clips) - 1:
            clip = clip.fadeout(1)
        final_clip.append(clip)

        
    final_video = concatenate_videoclips(final_clip, method='compose')
    background_audio = AudioFileClip('music/upbeatMusic.mp3')
    background_audio = background_audio.volumex(0.1)
    background_audio = background_audio.set_duration(final_video.duration)
    final_audio = CompositeAudioClip([final_video.audio , background_audio])
    final_video = final_video.set_audio(final_audio)
    final_video.write_videofile(output_path, codec='libx264', audio_codec='aac')

    for i in range(len(video_clips)):
        os.remove(f"voiceover_{i}.mp3")


video_clips = ['videos/Scene1.mp4', 'videos/Scene2.mp4', 'videos/Scene3.mp4' , 'videos/Scene4.mp4' , 'videos/Scene5.mp4']
voiceover_texts = [
'What’s worse than your resume being overlooked?',
'Highlight those key sections! ',
"Next up—make your skills shine!",
"Then, quantify your achievements!  ",
"Finally, keep it concise and engaging!",
]
text_overlay = [
    "What’s worse than your resume being overlooked?  Messy desk full of competing ones!",
    "First things first: highlight those key sections! A well-structured resume is like a good dish—It sells itself.",
    "Next up—make your skills shine! Remember, if your skills don’t sparkle, they might just blend in like your morning toast!  ",
    "Then, quantify your achievements! Don’t just say you did well—show them! Numbers talk louder than your Aunt’s karaoke nights!",
    "Finally, keep it concise and engaging! If your resume is a page-turner, it’ll get you an interview in no time! Good luck! "
]
output_path = 'final_output_video.mp4'


merge_video_with_text_and_voiceover(video_clips, voiceover_texts, text_overlay, output_path , True)