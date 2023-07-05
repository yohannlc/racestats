import re

file_read = open("trio.txt","r")
datas = file_read.readlines()
file_read.close()

nb_lines = len(datas)
nb_columns = 0
datas0_parsed = datas[0].split(',')

# get number of colums without \n, so number of plates
for i in datas0_parsed:
    if(str(i) != "\n"):
        nb_columns+=1

nb_columns

tab = list()
new_line = []
for i in range(nb_columns):
    tab.append(new_line)

for i in range(nb_lines):
    current_line = datas[i]
    line_parsed = current_line.split(',')
    for j in range(nb_columns):
        current_elem = line_parsed[j]
        current_elem_list = list()
        current_elem_list.append(current_elem)
        tab[j] = tab[j] + current_elem_list

tab_str = str(tab)
tab_edit = tab_str.replace(', [',',\n[')

file_export = open("trio.js","w")
file_export.write("let trio = " + tab_edit + ";")
file_export.close()