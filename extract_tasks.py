import re

# Вкажи точну назву свого .backup файлу
file_path = "tasks.backup"  # або як він у тебе називається

print("Читаємо файл...")
with open(file_path, "rb") as f:
    # Читаємо бінарні дані та ігноруємо помилки кодування
    raw_data = f.read().decode("utf-8", errors="ignore")

# Шукаємо шматки тексту, де є умови завдань та теорія
keywords = ["TASK DESCRIPTION", "CHAPTER DESCRIPTION", "Theory part", "Write a program"]

print("\n--- ЗНАЙДЕНІ ТЕКСТОВІ ФРАГМЕНТИ ---\n")
found = 0
for line in raw_data.split("\n"):
    if any(key in line for key in keywords):
        print(line.strip())
        print("-" * 50)
        found += 1
        if found >= 10:  # покажемо перші 10 знахідок
            break

if found == 0:
    print("Не знайдено за ключовими словами. Шукаємо будь-які текстові блоки...")
    # Резервний пошук довгих текстових рядків
    clean_text = re.findall(r'[A-Za-z0-9\s\,\.\{\}\(\)\=\;\":]{30,}', raw_data)
    for sample in clean_text[:5]:
        print(sample.strip())
        print("-" * 50)
