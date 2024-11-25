
import time
import requests

auth_key = "5ea4d25d-8b4e-4c9c-a939-5e6bcca7d3df"


def call_flux_pro_api(prompt):
    url = "https://api.bfl.ml/v1/flux-pro-1.1"
    headers = {
     'Content-Type': 'application/json',
     'X-Key': '5ea4d25d-8b4e-4c9c-a939-5e6bcca7d3df'
    }

    data  = {
        "prompt" : prompt,
        "width" :  1080,
        "height" : 1920,
        "prompt_upsampling" : False,
        "seed" : 42,
        "safety_tolerance" : 2
    }

    try:
        response = requests.post(url , headers = headers , json=data)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"Api call failed : {e}")
        return None


def generate_image(image_prompt):
    try:
        for scene in image_prompt:
            img_prompt = image_prompt[scene]
            print(img_prompt["prompt"])
            # Use flux here to generate image then save the images 
            # resp = call_flux_pro_api(img_prompt["prompt"])
            
            img_id = resp["id"]

            #remove this after
            img_id = "c6fcec68-ebad-468b-b5bd-aecb4f69d0e6"

            break

            # steps to mock this process
            time.sleep(2)
            print(f"Image generated for {img_prompt}")
            

        # print("Image generation done")
    except Exception as e :
        print(e)
