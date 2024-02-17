import bpy
import sys

argv = sys.argv
argv = argv[argv.index("--") + 1:]

bpy.ops.wm.open_mainfile(filepath=argv[0])

bpy.ops.export_scene.gltf(filepath='output.glb')
