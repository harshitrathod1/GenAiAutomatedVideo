from script_Generation.dummyScript import scriptGen
import json
import time

def generate_script(topic):
    script_generated = False
    try:
        # open AI  Hit here for script generation



        # Mock to simulate this process
        response = scriptGen()
        parsed_script = json.loads(response)
        time.sleep(4)
        return parsed_script


    except :
        return script_generated