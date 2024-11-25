import os


cwd = os.getcwd()

path_to_clips = f"{cwd}/clips"

if os.path.exists(path_to_clips):
    for item in os.listdir(path_to_clips):
        item_path = os.path.join(path_to_clips , item)
        # print(item_path)
        if os.path.isfile(item_path):
            os.remove(item_path)