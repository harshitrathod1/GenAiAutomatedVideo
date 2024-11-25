import os
from google.cloud import texttospeech
from pydub import AudioSegment
import time
from pydub.playback import play
from pydub import AudioSegment
from generateAudioScript import ssml_scripts


def generateAudio(cid):
    scripts = ssml_scripts[cid]

    for i, ssml in enumerate(scripts):
        input_text = texttospeech.SynthesisInput(ssml=ssml)
        response = client.synthesize_speech(input=input_text, voice=voice, audio_config=audio_config)
        
        folder_name = 'audio_files'  # Replace with the folder of your choice
        os.makedirs(folder_name, exist_ok=True)  # Create the folder if it doesn't exist
        
        file_name = f"{cid}_part_{i+1}.mp3"
        file_path = os.path.join(folder_name, file_name)

        with open(file_path, "wb") as out:
            out.write(response.audio_content)
            print(f"Audio content written to file {file_name}")
        
        audio_files.append(file_name)

if __name__ == "__main__":
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "./gcloudkey.json"
    client = texttospeech.TextToSpeechClient()

    print("setting up voice")

    voice = texttospeech.VoiceSelectionParams(
        language_code="en-IN",
        name="en-IN-standard-F",
        ssml_gender=texttospeech.SsmlVoiceGender.MALE
    )

    print("setting up audio config")

    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.LINEAR16
    )

    audio_files = []
    
    print("generating final audio")

    generateAudio("114")