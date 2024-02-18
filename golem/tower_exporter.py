import bpy
import random
import os

obj_list = [
    "towerRoundA",
    "towerRoundB",
    "towerRoundC",
    "towerRoundD",
    "towerRoundE",
    "towerRoundF",
    "towerSquareA",
    "towerSquareB",
    "towerSquareC",
    "towerSquareD",
    "towerSquareE",
    "towerSquareF",
]

def select_hierarchy(obj):
    bpy.context.view_layer.objects.active = obj
    obj.select_set(True)
    
    for child in obj.children:
        select_hierarchy(child)
        
bpy.ops.object.select_all(action='DESELECT')

selected_object_name = random.choice(obj_list)

if selected_object_name in bpy.data.objects:
    selected_object = bpy.data.objects[selected_object_name]
    select_hierarchy(selected_object)
    output_dir = "C:/Users/frank/OneDrive/Desktop/"
    filename = "output.glb"
    filepath = os.path.join(output_dir, filename)
    bpy.ops.export_scene.gltf(filepath=filepath, use_selection=True)
else:
    printf(f"No object named {selected_object_name} in the scene")

