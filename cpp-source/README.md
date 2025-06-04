
# Task Manager C++ Implementation

## Struktur Folder
```
cpp-source/
├── include/           # Header files (.hpp)
│   └── TaskManager.hpp
├── src/              # Source files (.cpp)
│   ├── TaskManager.cpp
│   └── main.cpp
└── README.md
```

## Kompilasi dan Menjalankan

### Menggunakan g++
```bash
cd cpp-source
g++ -I./include src/main.cpp src/TaskManager.cpp -o task_manager
./task_manager
```

### Menggunakan Makefile (opsional)
```makefile
CXX = g++
CXXFLAGS = -Wall -Wextra -std=c++11
INCDIR = include
SRCDIR = src
OBJDIR = obj

SOURCES = $(wildcard $(SRCDIR)/*.cpp)
OBJECTS = $(SOURCES:$(SRCDIR)/%.cpp=$(OBJDIR)/%.o)
TARGET = task_manager

all: $(TARGET)

$(TARGET): $(OBJECTS)
	$(CXX) $(OBJECTS) -o $@

$(OBJDIR)/%.o: $(SRCDIR)/%.cpp
	@mkdir -p $(OBJDIR)
	$(CXX) $(CXXFLAGS) -I$(INCDIR) -c $< -o $@

clean:
	rm -rf $(OBJDIR) $(TARGET)

.PHONY: all clean
```

## Fitur Tambahan yang Ditambahkan
- Pencarian tugas berdasarkan nama atau kategori
- Struktur kode yang lebih terorganisir dengan pemisahan header dan implementasi
- Memory management yang lebih baik dengan destructor
- Encapsulation menggunakan class
