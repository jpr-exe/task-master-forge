
#ifndef TASKMANAGER_HPP
#define TASKMANAGER_HPP

#include <iostream>
#include <string>
#include <iomanip>
using namespace std;

// Typedef pointer
struct Task;
typedef Task* TaskPtr;

struct StackNode;
typedef StackNode* StackPtr;

struct QueueNode;
typedef QueueNode* QueuePtr;

// Struktur data
struct Task {
    int code;
    string name;
    int priority;
    int day;
    int month;
    int year;
    string category;
    TaskPtr prev;
    TaskPtr next;
};

struct StackNode {
    string name;
    int priority;
    StackPtr next;
};

struct QueueNode {
    TaskPtr task;
    QueuePtr next;
};

// Class TaskManager
class TaskManager {
private:
    TaskPtr head, tail;
    StackPtr redoTop, doneTop;
    QueuePtr queueFront, queueRear;
    int taskCounter;
    static const string monthNames[13];

public:
    TaskManager();
    ~TaskManager();
    
    void createList();
    TaskPtr createElement(string name, int priority, int day, int month, int year, string category);
    void addTask(const string& name, int priority, int day, int month, int year, const string& category);
    void deleteTask(int code);
    void redo();
    void finishTask(int code);
    void showTasks();
    void showDoneTasks();
    void showMenu();
    void searchTask(const string& keyword);
    void sortTasksByPriority();
    void sortTasksByDate();
    void run();
};

#endif
