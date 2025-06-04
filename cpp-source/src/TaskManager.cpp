
#include "../include/TaskManager.hpp"

const string TaskManager::monthNames[13] = {"", "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"};

TaskManager::TaskManager() {
    createList();
}

TaskManager::~TaskManager() {
    // Cleanup memory
    while (head) {
        TaskPtr temp = head;
        head = head->next;
        delete temp;
    }
    
    while (redoTop) {
        StackPtr temp = redoTop;
        redoTop = redoTop->next;
        delete temp;
    }
    
    while (doneTop) {
        StackPtr temp = doneTop;
        doneTop = doneTop->next;
        delete temp;
    }
    
    while (queueFront) {
        QueuePtr temp = queueFront;
        queueFront = queueFront->next;
        delete temp;
    }
}

void TaskManager::createList() {
    head = tail = nullptr;
    redoTop = doneTop = nullptr;
    queueFront = queueRear = nullptr;
    taskCounter = 1;
}

TaskPtr TaskManager::createElement(string name, int priority, int day, int month, int year, string category) {
    TaskPtr pBaru = new Task;
    pBaru->code = taskCounter++;
    pBaru->name = name;
    pBaru->priority = priority;
    pBaru->day = day;
    pBaru->month = month;
    pBaru->year = year;
    pBaru->category = category;
    pBaru->prev = nullptr;
    pBaru->next = nullptr;
    return pBaru;
}

void TaskManager::addTask(const string& name, int priority, int day, int month, int year, const string& category) {
    TaskPtr pBaru = createElement(name, priority, day, month, year, category);

    if (!head) {
        head = tail = pBaru;
    } else {
        TaskPtr pBantu = head;
        while (pBantu && pBantu->priority <= priority) {
            pBantu = pBantu->next;
        }

        if (!pBantu) {
            tail->next = pBaru;
            pBaru->prev = tail;
            tail = pBaru;
        } else if (pBantu == head) {
            pBaru->next = head;
            head->prev = pBaru;
            head = pBaru;
        } else {
            pBaru->next = pBantu;
            pBaru->prev = pBantu->prev;
            pBantu->prev->next = pBaru;
            pBantu->prev = pBaru;
        }
    }

    QueuePtr qBaru = new QueueNode;
    qBaru->task = pBaru;
    qBaru->next = nullptr;

    if (!queueRear) queueFront = queueRear = qBaru;
    else {
        queueRear->next = qBaru;
        queueRear = qBaru;
    }

    cout << "Tugas \"" << name << "\" ditambahkan dengan kode " << pBaru->code << ".\n";
}

void TaskManager::deleteTask(int code) {
    TaskPtr pBantu = head;
    while (pBantu) {
        if (pBantu->code == code) {
            StackPtr pBaru = new StackNode;
            pBaru->name = pBantu->name;
            pBaru->priority = pBantu->priority;
            pBaru->next = redoTop;
            redoTop = pBaru;

            if (pBantu->prev) pBantu->prev->next = pBantu->next;
            else head = pBantu->next;

            if (pBantu->next) pBantu->next->prev = pBantu->prev;
            else tail = pBantu->prev;

            delete pBantu;
            cout << "Tugas dengan kode " << code << " dihapus dan dapat diredo.\n";
            return;
        }
        pBantu = pBantu->next;
    }
    cout << "Tugas tidak ditemukan.\n";
}

void TaskManager::redo() {
    if (!redoTop) {
        cout << "Tidak ada tugas untuk diredo.\n";
        return;
    }

    StackPtr pBaru = redoTop;
    redoTop = redoTop->next;
    addTask(pBaru->name, pBaru->priority, 1, 1, 2025, "General");
    delete pBaru;
}

void TaskManager::finishTask(int code) {
    TaskPtr pBantu = head;
    while (pBantu) {
        if (pBantu->code == code) {
            StackPtr pBaru = new StackNode;
            pBaru->name = pBantu->name;
            pBaru->priority = pBantu->priority;
            pBaru->next = doneTop;
            doneTop = pBaru;

            if (pBantu->prev) pBantu->prev->next = pBantu->next;
            else head = pBantu->next;

            if (pBantu->next) pBantu->next->prev = pBantu->prev;
            else tail = pBantu->prev;

            delete pBantu;
            cout << "Tugas dengan kode " << code << " telah diselesaikan.\n";
            return;
        }
        pBantu = pBantu->next;
    }
    cout << "Tugas tidak ditemukan.\n";
}

void TaskManager::showTasks() {
    if (!head) {
        cout << "Tidak ada tugas.\n";
        return;
    }
    TaskPtr pBantu = head;
    cout << "\nDaftar Tugas:\n";
    cout << left << setw(6) << "Kode" << setw(20) << "Nama" << setw(10) << "Prioritas" << setw(20) << "Deadline" << "Kategori\n";
    while (pBantu) {
        cout << left << setw(6) << pBantu->code
             << setw(20) << pBantu->name
             << setw(10) << pBantu->priority
             << setw(20) << (to_string(pBantu->day) + " " + monthNames[pBantu->month] + " " + to_string(pBantu->year))
             << pBantu->category << endl;
        pBantu = pBantu->next;
    }
}

void TaskManager::showDoneTasks() {
    if (!doneTop) {
        cout << "Belum ada tugas selesai.\n";
        return;
    }
    StackPtr pBantu = doneTop;
    cout << "\nTugas yang telah diselesaikan:\n";
    while (pBantu) {
        cout << "- " << pBantu->name << " [Prioritas: " << pBantu->priority << "]\n";
        pBantu = pBantu->next;
    }
}

void TaskManager::searchTask(const string& keyword) {
    if (!head) {
        cout << "Tidak ada tugas.\n";
        return;
    }
    
    TaskPtr pBantu = head;
    bool found = false;
    cout << "\nHasil pencarian untuk \"" << keyword << "\":\n";
    cout << left << setw(6) << "Kode" << setw(20) << "Nama" << setw(10) << "Prioritas" << setw(20) << "Deadline" << "Kategori\n";
    
    while (pBantu) {
        if (pBantu->name.find(keyword) != string::npos || 
            pBantu->category.find(keyword) != string::npos) {
            cout << left << setw(6) << pBantu->code
                 << setw(20) << pBantu->name
                 << setw(10) << pBantu->priority
                 << setw(20) << (to_string(pBantu->day) + " " + monthNames[pBantu->month] + " " + to_string(pBantu->year))
                 << pBantu->category << endl;
            found = true;
        }
        pBantu = pBantu->next;
    }
    
    if (!found) {
        cout << "Tidak ada tugas yang ditemukan.\n";
    }
}

void TaskManager::showMenu() {
    cout << "\n=== TASK MANAGER ===\n";
    cout << "1. Tambah Tugas\n";
    cout << "2. Hapus Tugas\n";
    cout << "3. Lihat Semua Tugas\n";
    cout << "4. Tandai Tugas Selesai\n";
    cout << "5. Lihat Tugas Selesai\n";
    cout << "6. Redo Tugas Terakhir yang Dihapus\n";
    cout << "7. Cari Tugas\n";
    cout << "8. Keluar\n";
    cout << "Pilih menu: ";
}

void TaskManager::run() {
    string nama, kategori, keyword;
    int prioritas, day, month, year, code, pilihan;

    while (true) {
        showMenu();
        cin >> pilihan;
        cin.ignore();

        switch (pilihan) {
            case 1:
                cout << "Nama tugas: ";
                getline(cin, nama);
                cout << "Prioritas (1–5): ";
                cin >> prioritas;
                cout << "Tanggal deadline (dd mm yyyy): ";
                cin >> day >> month >> year;
                cin.ignore();
                cout << "Kategori: ";
                getline(cin, kategori);
                addTask(nama, prioritas, day, month, year, kategori);
                break;
            case 2:
                cout << "Masukkan kode tugas yang ingin dihapus: ";
                cin >> code;
                deleteTask(code);
                break;
            case 3:
                showTasks();
                break;
            case 4:
                cout << "Masukkan kode tugas yang diselesaikan: ";
                cin >> code;
                finishTask(code);
                break;
            case 5:
                showDoneTasks();
                break;
            case 6:
                redo();
                break;
            case 7:
                cout << "Masukkan kata kunci pencarian: ";
                getline(cin, keyword);
                searchTask(keyword);
                break;
            case 8:
                cout << "Keluar...\n";
                return;
            default:
                cout << "Pilihan tidak valid.\n";
        }
    }
}
