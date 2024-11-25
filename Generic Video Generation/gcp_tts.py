import os
from google.cloud import texttospeech 

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'demo_service_account.json'
client = texttospeech.TextToSpeechClient()

def convert_text_to_speech(textblock , filename):
    synthesis_input = texttospeech.SynthesisInput(text=textblock)
    voice = texttospeech.VoiceSelectionParams(
    language_code =  "en-IN",
    name =  "en-IN-Journey-F"
    )

    audio_config = texttospeech.AudioConfig(
        audio_encoding="LINEAR16",
        effects_profile_id =  [
        "large-home-entertainment-class-device"
        ],
        pitch  = 0,
        speaking_rate = 0
    )

    response = client.synthesize_speech(
        input = synthesis_input,voice=voice,audio_config=audio_config
    )

    with open(filename , "wb") as output:
        output.write(response.audio_content)
        print("Audio content wriiten to file")






