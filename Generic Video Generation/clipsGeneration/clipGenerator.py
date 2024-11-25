
import time
def generate_vid(video_prompts):
    OUTPUT_FILE = "Videos"
    try:
        for scene in video_prompts:
            vid_prompt = video_prompts[scene]
            # use runway here to generate clips , save it in output file
            
            # Mock to simulate this process
            time.sleep(5)
            print(f"clip generated for {vid_prompt}")
            

    except Exception as e :
        print(e)
