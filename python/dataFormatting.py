import re

file_read = open("txt/quatuor.txt","r")
list_lines = file_read.readlines()
file_read.close()

# console log des lignes
for line in list_lines:
    print(line)
