from moviepy.editor import TextClip
# print(TextClip.list("font"))

fonts = TextClip.list("font")

for font in fonts:
    print(font)