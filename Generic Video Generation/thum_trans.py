from moviepy.editor import ImageClip, TextClip, CompositeVideoClip , AudioFileClip

# Parameters
image_path = "thumbnail.png"  # Replace with your image file path
text1 = "Resolve"
text2 = "Workplace conflict"
image_duration = 5  # Duration of the image clip in seconds
text_animation_duration = 1  # Duration of the text transition animation in seconds
# screen_width, screen_height = 1280, 720  # Screen resolution

# Load the image as a background clip
image_clip = ImageClip(image_path).set_duration(image_duration)
screen_width ,screen_height = image_clip.size 
# Create the text clip
txt_clip = TextClip(text1, fontsize=40, color='white')
txt_clip = txt_clip.set_duration(image_duration)  # Duration matches the image clip

txt_clip2 = TextClip(text2 , fontsize = 70, color = 'white' ,  stroke_color = "black",
                stroke_width = 2
                )

txt_clip2 = txt_clip2.set_duration(image_duration)
sound_eff = AudioFileClip('slide_in_sound_effect.mp3') 




# Define the position animation function
def move_from_right(t ,  yPos):
    # print(t)
    if t < 0.6:
        # Calculates x position from right to center over 1 second
        x = screen_width - (screen_width / text_animation_duration) * t
        y = yPos # Vertically centered
    else:
        # After 1 second, keep the text in the center
        x = 'center' # Centered horizontally
        y = yPos
    return x, y

# Apply the position animation

animated_text = txt_clip.set_position(lambda t : move_from_right(t , 30))
animated_text2 = txt_clip2.set_position(lambda t : move_from_right(t , 70))

# Composite the image and animated text
final_clip = CompositeVideoClip([image_clip, animated_text , animated_text2])

if sound_eff.duration > final_clip.duration:
    sound_eff = sound_eff.subclip(final_clip.duration)

final_clip = final_clip.set_audio(sound_eff)

# Save the final video
final_clip.write_videofile("image_with_text_animation.mp4", fps=24)
