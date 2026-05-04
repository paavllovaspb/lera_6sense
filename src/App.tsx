import { useState, useEffect } from 'react';
import {
  Moon, Sun, Archive, Plus, X, ChevronRight, ChevronDown, Edit2, Save,
  Phone, Send, Briefcase, Award, Clock, ExternalLink, Calendar, LayoutList,
  Sparkles, ArrowUp, Star, ClipboardCheck, CheckCircle, RotateCcw,
  AlertTriangle, Info, CheckCircle as CheckCircleIcon
} from 'lucide-react';
import {
  Contractor, ArchivedContractor, Task, Theme,
  SPECIALIZATIONS, REVIEW_MANAGERS, ARCHIVE_REASONS,
  POST_EVALUATION_CRITERIA, EVALUATION_OPTIONS,
  TASKS_BY_STATUS, ALL_STATUSES
} from './types';

// Let's create exactly 10 contractor examples to ensure all statuses are present
const initialContractors: Contractor[] = [
  {
    id: 1, name: "Иван Иванов", photo: "https://img.freepik.com/free-photo/bearded-man-suit-posing-with-crossed-arms_171337-18592.jpg?w=740&q=80",
    phone: "+7 993 639 14 80", telegram: "@ivanivanov", grade: "Senior", gradeAgreement: true,
    type: "Самостоятельный специалист", spec: "Брендинг", experience: "7 лет", clientType: "Крупные компании",
    role: "Руководитель проекта", openEnded: "Да", description: "Опытный специалист в области брендинга с 7-летним стажем.",
    resume: "https://drive.google.com", portfolio: "—", status: "На скоринге", managerTask: "Проверить портфолио",
    createdAt: "2024-02-01", lastCommunication: "2024-06-20", postEvaluation: {}, archiveReason: null, tasks: []
  },
  {
    id: 2, name: "Студия Future UI", photo: "",
    phone: "+7 916 123-45-67", telegram: "@future_ui_bot", grade: "N/A", gradeAgreement: null,
    type: "Агенство", spec: "Web-разработка", experience: "12 лет", clientType: "Международные бренды",
    role: "Руководитель юнита", openEnded: "Да", description: "Агентство полного цикла. Специализация — сложные веб-приложения.",
    resume: "#", portfolio: "https://futureui.dev", status: "Готов к пресейлу", managerTask: "Подготовить контракт",
    createdAt: "2024-05-10", lastCommunication: "2024-06-15", postEvaluation: {}, archiveReason: null, tasks: []
  },
  {
    id: 3, name: "Петров Сергей", photo: "",
    phone: "+7 903 555-55-55", telegram: "@spetrov_work", grade: "N/A", gradeAgreement: null,
    type: "Проектная команда", spec: "Growth маркетинг", experience: "7 лет", clientType: "Крупные компании",
    role: "Руководитель проекта", openEnded: "Иногда", description: "Команда под growth-задачи: аналитика, эксперименты.",
    resume: "#", portfolio: "—", status: "Нужна пост-оценка", managerTask: "Провести пост-оценку",
    createdAt: "2024-06-01", lastCommunication: "2024-06-10",
    postEvaluation: { businessResult: "Хорошо", deadlines: "Отлично", communication: "Хорошо", clientExpectations: "", initiative: "" },
    archiveReason: null, tasks: []
  },
  {
    id: 4, name: "Никита Орлов", phone: "+7 900 123 45 67", telegram: "@nikita_o", grade: "Junior", gradeAgreement: false,
    type: "Самостоятельный специалист", spec: "UX/UI дизайн", experience: "0 лет", clientType: "—",
    role: "Стажер", openEnded: "Да", description: "Начинающий UX/UI дизайнер, активно обучается.",
    resume: "—", portfolio: "—", status: "На скоринге", managerTask: "Назначить звонок",
    createdAt: "2025-03-15", lastCommunication: "2025-03-20", postEvaluation: {}, archiveReason: null, tasks: []
  },
  {
    id: 5, name: "Алексей Смирнов", phone: "+7 910 222-33-44", telegram: "@alex_smirnov", grade: "Middle", gradeAgreement: true,
    type: "Самостоятельный специалист", spec: "Дизайн и айдентика", experience: "4 года", clientType: "Малый бизнес",
    role: "Специалист", openEnded: "Да", description: "Дизайнер айдентики. Создание логотипов, визуальных стилей.",
    resume: "#", portfolio: "https://behance.net", status: "Первичный скоринг пройден", managerTask: "Проверить портфолио",
    createdAt: "2024-08-20", lastCommunication: "2024-08-25", postEvaluation: {}, archiveReason: null, tasks: []
  },
  {
    id: 6, name: "Ольга Волкова", phone: "+7 905 111-22-33", telegram: "@olga_volk", grade: "Middle", gradeAgreement: true,
    type: "Самостоятельный специалист", spec: "Контент-маркетинг", experience: "5 лет", clientType: "Стартапы",
    role: "Автор", openEnded: "Да", description: "Создание текстов любой сложности. Копирайтинг.",
    resume: "#", portfolio: "—", status: "Нужно запросить документы", managerTask: "Запросить документы",
    createdAt: "2024-09-01", lastCommunication: "2024-09-10", postEvaluation: {}, archiveReason: null, tasks: []
  },
  {
    id: 7, name: "Дмитрий Морозов", phone: "+7 911 333-44-55", telegram: "@dima_moroz", grade: "Senior", gradeAgreement: true,
    type: "Самостоятельный специалист", spec: "SEO", experience: "8 лет", clientType: "Крупный бизнес",
    role: "Эксперт", openEnded: "Да", description: "Технический SEO-аудит, продвижение крупных порталов.",
    resume: "#", portfolio: "—", status: "Документы получены", managerTask: "Ознакомиться с документами",
    createdAt: "2024-10-05", lastCommunication: "2024-10-15", postEvaluation: {}, archiveReason: null, tasks: []
  },
  {
    id: 8, name: "Креативное агентство 'Spark'", phone: "+7 925 555-44-33", telegram: "@spark_agency", grade: "N/A", gradeAgreement: null,
    type: "Агенство", spec: "Дизайн и айдентика", experience: "6 лет", clientType: "Крупные бренды",
    role: "Руководитель проекта", openEnded: "Да", description: "Разработка фирменного стиля и визуальных концепций.",
    resume: "#", portfolio: "https://spark.concept", status: "Согласован на пресейл", managerTask: "Подготовить оффер",
    createdAt: "2024-11-12", lastCommunication: "2024-11-20", postEvaluation: {}, archiveReason: null, tasks: []
  },
  {
    id: 9, name: "Артем Калинин", phone: "+7 999 888-77-66", telegram: "@artem_kalina", grade: "Senior", gradeAgreement: true,
    type: "Самостоятельный специалист", spec: "No-code разработка", experience: "4 года", clientType: "Стартапы",
    role: "Разработчик", openEnded: "Иногда", description: "Создание MVP на Bubble, Webflow и Zapier.",
    resume: "#", portfolio: "https://artem.nocode", status: "На проекте / в работе", managerTask: "Мониторить прогресс",
    createdAt: "2024-11-25", lastCommunication: "2024-12-05", postEvaluation: {}, archiveReason: null, tasks: []
  },
  {
    id: 10, name: "Елена Кузнецова", phone: "+7 912 345-67-89", telegram: "@elena_kuz", grade: "Executive", gradeAgreement: true,
    type: "Самостоятельный специалист", spec: "Маркетинговая стратегия", experience: "10 лет", clientType: "Enterprise",
    role: "Директор по маркетингу", openEnded: "Нет", description: "Консалтинг в сфере стратегического маркетинга.",
    resume: "#", portfolio: "—", status: "Шорт-лист", managerTask: "Сформировать пул задач",
    createdAt: "2024-12-10", lastCommunication: "2024-12-20", postEvaluation: {}, archiveReason: null, tasks: []
  },
];

const STATUS_ORDER = [
  'На скоринге', 'Шорт-лист', 'Первичный скоринг пройден', 'Нужно запросить документы',
  'Документы получены', 'Готов к пресейлу', 'Согласован на пресейл', 'На проекте / в работе', 'Нужна пост-оценка'
];

function App() {
  // Always sort initial data by STATUS_ORDER
  const sortContractors = (arr: Contractor[]) => {
    return [...arr].sort((a, b) => {
      const idxA = STATUS_ORDER.indexOf(a.status);
      const idxB = STATUS_ORDER.indexOf(b.status);
      if (idxA === -1 && idxB === -1) return 0;
      if (idxA === -1) return 1;
      if (idxB === -1) return -1;
      return idxA - idxB;
    });
  };

  const [contractors, setContractors] = useState<Contractor[]>(() => sortContractors(initialContractors));
  const [archivedContractors, setArchivedContractors] = useState<ArchivedContractor[]>([]);
  const [theme, setTheme] = useState<Theme>('light');
  const [isViewingArchive, setIsViewingArchive] = useState(false);
  
  const [filterSearch, setFilterSearch] = useState('');
  const [filterSpec, setFilterSpec] = useState('');
  const [filterGrade, setFilterGrade] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  
  const [selectedContractor, setSelectedContractor] = useState<Contractor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isArchiveReasonModalOpen, setIsArchiveReasonModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  
  const [pendingArchiveContractor, setPendingArchiveContractor] = useState<Contractor | null>(null);
  const [selectedArchiveReason, setSelectedArchiveReason] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editingTaskContractorId, setEditingTaskContractorId] = useState<number | null>(null);
  
  const [taskFilter, setTaskFilter] = useState<'all' | 'mine'>('all');
  const [editingField, setEditingField] = useState<{ field: string; value: string } | null>(null);
  const [draggedContractorId, setDraggedContractorId] = useState<number | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.remove('light-theme');
      document.documentElement.classList.add('dark-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark-theme', 'dark');
      document.documentElement.classList.add('light-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const isAgencyOrTeam = (c: Contractor) => c.type === 'Агенство' || c.type === 'Проектная команда';
  
  const displayGrade = (c: Contractor) => isAgencyOrTeam(c) ? 'N/A' : (c.grade || '—');
  
  const gradeAgreementText = (c: Contractor) => {
    if (isAgencyOrTeam(c)) return 'Грейд не применяется';
    return c.gradeAgreement ? 'Согласен' : 'Не согласен';
  };
  
  const gradeAgreementClass = (c: Contractor) => {
    if (isAgencyOrTeam(c)) return 'na';
    return c.gradeAgreement ? 'agreed' : 'disagreed';
  };

  const getStatusClass = (status: string) => {
    const map: Record<string, string> = {
      "На скоринге": "scoring", "Шорт-лист": "shortlist", "Первичный скоринг пройден": "pending",
      "Нужно запросить документы": "documents", "Документы получены": "documents", "Готов к пресейлу": "presale",
      "Согласован на пресейл": "presale", "На проекте / в работе": "active", "В работе": "active",
      "Нужна пост-оценка": "posteval", "Архив": "archived"
    };
    return map[status] || "pending";
  };

  const formatDate = (date: string) => {
    if (!date) return '—';
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return '—';
    return d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const isStale = (c: Contractor) => {
    if (c.status !== "На скоринге") return false;
    if (!c.lastCommunication) return true;
    const diffDays = Math.ceil(Math.abs(new Date().getTime() - new Date(c.lastCommunication).getTime()) / (1000 * 60 * 60 * 24));
    return diffDays > 30;
  };

  const getDefaultTasksForStatus = (status: string): Task[] => {
    const defaultTasks = TASKS_BY_STATUS[status] || [];
    return defaultTasks.map((dt, i) => ({
      id: `default-${Date.now()}-${i}`,
      title: dt.title,
      status: 'todo' as const,
      dueDate: new Date(new Date().getTime() + dt.daysOffset * 24 * 60 * 60 * 1000).toISOString(),
      assignee: '',
      isDefault: true
    }));
  };

  const calculateCompletenessDetails = (c: Contractor) => {
    const fields: { key: keyof Contractor; label: string }[] = [
      { key: 'name', label: 'ФИО' }, { key: 'phone', label: 'Телефон' },
      { key: 'telegram', label: 'Telegram' }, { key: 'type', label: 'Тип подрядчика' },
      { key: 'spec', label: 'Специализация' }, { key: 'experience', label: 'Опыт' },
      { key: 'clientType', label: 'Тип клиента' }, { key: 'role', label: 'Роль в проектах' },
      { key: 'openEnded', label: 'Open-ended задачи' }, { key: 'description', label: 'Описание' },
      { key: 'resume', label: 'Резюме' }, { key: 'portfolio', label: 'Портфолио' }
    ];
    if (!isAgencyOrTeam(c)) {
      fields.push({ key: 'grade', label: 'Грейд' });
      fields.push({ key: 'gradeAgreement', label: 'Согласие с грейдом' });
    }
    const missing = fields.filter(f => {
      const v = c[f.key];
      return v === undefined || v === null || v === '' || v === '—' || v === '#';
    }).map(f => f.label);
    const filled = fields.length - missing.length;
    return { percent: Math.round((filled / fields.length) * 100), missing };
  };

  const hasPostEvaluationData = (c: Contractor) => {
    if (!c.postEvaluation) return false;
    return Object.values(c.postEvaluation).some(val => val && val !== '');
  };

  const filteredContractors = contractors.filter(c => {
    const matchSearch = !filterSearch || c.name.toLowerCase().includes(filterSearch.toLowerCase()) || 
                        c.telegram?.toLowerCase().includes(filterSearch.toLowerCase());
    const matchSpec = !filterSpec || c.spec === filterSpec;
    const matchGrade = !filterGrade || displayGrade(c) === filterGrade;
    const matchStatus = !filterStatus || c.status === filterStatus;
    return matchSearch && matchSpec && matchGrade && matchStatus;
  });

  const filteredArchivedContractors = archivedContractors.filter(c => {
    const matchSearch = !filterSearch || c.name.toLowerCase().includes(filterSearch.toLowerCase());
    const matchSpec = !filterSpec || c.spec === filterSpec;
    const matchGrade = !filterGrade || displayGrade(c) === filterGrade;
    return matchSearch && matchSpec && matchGrade;
  });

  const [toasts, setToasts] = useState<{ id: number; message: string; type: 'success' | 'info' | 'warning' }[]>([]);
  
  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const openModal = (contractor: Contractor) => {
    setSelectedContractor({ ...contractor });
    setIsModalOpen(true);
    setIsStatusDropdownOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedContractor(null);
    setEditingField(null);
    setIsStatusDropdownOpen(false);
  };

  const openCreateModal = () => {
    setSelectedContractor({
      id: Date.now(),
      name: "", photo: "", phone: "", telegram: "", spec: "", grade: "Middle", gradeAgreement: true,
      type: "Самостоятельный специалист", experience: "", clientType: "", role: "", openEnded: "",
      description: "", resume: "", portfolio: "", status: "На скоринге", managerTask: "",
      createdAt: new Date().toISOString(), lastCommunication: new Date().toISOString(),
      postEvaluation: {}, archiveReason: null, tasks: []
    });
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    setSelectedContractor(null);
  };

  const createContractor = () => {
    if (!selectedContractor?.name.trim()) {
      showToast('Введите имя подрядчика', 'info');
      return;
    }
    setContractors(prev => sortContractors([selectedContractor, ...prev]));
    closeCreateModal();
    showToast('Подрядчик создан', 'success');
  };

  const saveContractor = () => {
    if (selectedContractor) {
      setContractors(prev => sortContractors(prev.map(c => c.id === selectedContractor.id ? selectedContractor : c)));
      showToast('Изменения сохранены', 'success');
    }
    closeModal();
  };

  const showArchive = () => {
    setIsViewingArchive(true);
    setFilterSearch('');
    setFilterSpec('');
    setFilterGrade('');
    setFilterStatus('');
  };

  const closeArchive = () => {
    setIsViewingArchive(false);
  };

  const openArchiveReasonModal = (contractor: Contractor) => {
    setPendingArchiveContractor(contractor);
    setSelectedArchiveReason(null);
    setIsArchiveReasonModalOpen(true);
  };

  const closeArchiveReasonModal = () => {
    setIsArchiveReasonModalOpen(false);
    setPendingArchiveContractor(null);
    setSelectedArchiveReason(null);
  };

  const confirmArchive = () => {
    if (!selectedArchiveReason || !pendingArchiveContractor) {
      showToast('Выберите причину архивации', 'info');
      return;
    }
    const archived: ArchivedContractor = {
      ...pendingArchiveContractor,
      archiveReason: selectedArchiveReason,
      status: 'Архив',
      archivedAt: new Date().toISOString()
    };
    setArchivedContractors(prev => [...prev, archived]);
    setContractors(prev => prev.filter(c => c.id !== pendingArchiveContractor.id));
    closeArchiveReasonModal();
    closeModal();
    showToast(`Подрядчик архивирован. Причина: ${selectedArchiveReason}`, 'success');
  };

  const restoreFromArchive = (contractor: ArchivedContractor) => {
    const { archivedAt, archiveReason, ...rest } = contractor;
    rest.status = 'Шорт-лист';
    setContractors(prev => sortContractors([...prev, rest]));
    setArchivedContractors(prev => prev.filter(c => c.id !== contractor.id));
    showToast('Подрядчик восстановлен', 'success');
  };

  const openTaskModal = (contractorId: number, task: Task | null, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingTaskContractorId(contractorId);
    setEditingTask(task || {
      id: `task-${Date.now()}`,
      title: '',
      status: 'todo',
      dueDate: new Date().toISOString(),
      assignee: '',
      description: '',
      priority: 'medium'
    });
    setIsTaskModalOpen(true);
  };

  const closeTaskModal = () => {
    setIsTaskModalOpen(false);
    setEditingTask(null);
    setEditingTaskContractorId(null);
  };

  const saveTask = () => {
    if (!editingTask || editingTaskContractorId === null) return;
    setContractors(prev => sortContractors(prev.map(c => {
      if (c.id === editingTaskContractorId) {
        const tasks = c.tasks || [];
        const existingIndex = tasks.findIndex(t => t.id === editingTask.id);
        if (existingIndex === -1) {
          return { ...c, tasks: [...tasks, editingTask] };
        } else {
          const newTasks = [...tasks];
          newTasks[existingIndex] = editingTask;
          return { ...c, tasks: newTasks };
        }
      }
      return c;
    })));
    
    if (selectedContractor && selectedContractor.id === editingTaskContractorId) {
      setSelectedContractor(prev => {
        if (!prev) return null;
        const tasks = prev.tasks || [];
        const existingIndex = tasks.findIndex(t => t.id === editingTask.id);
        if (existingIndex === -1) {
          return { ...prev, tasks: [...tasks, editingTask] };
        } else {
          const newTasks = [...tasks];
          newTasks[existingIndex] = editingTask;
          return { ...prev, tasks: newTasks };
        }
      });
    }
    closeTaskModal();
    showToast('Задача сохранена', 'success');
  };

  const deleteTask = () => {
    if (!editingTask || editingTaskContractorId === null) return;
    setContractors(prev => sortContractors(prev.map(c => {
      if (c.id === editingTaskContractorId) {
        return { ...c, tasks: (c.tasks || []).filter(t => t.id !== editingTask.id) };
      }
      return c;
    })));
    if (selectedContractor && selectedContractor.id === editingTaskContractorId) {
      setSelectedContractor(prev => {
        if (!prev) return null;
        return { ...prev, tasks: (prev.tasks || []).filter(t => t.id !== editingTask.id) };
      });
    }
    closeTaskModal();
    showToast('Задача удалена', 'success');
  };

  const startEditField = (field: string) => {
    if (!selectedContractor) return;
    setEditingField({ field, value: selectedContractor[field as keyof Contractor] as string || '' });
  };

  const saveFieldEdit = () => {
    if (!editingField || !selectedContractor) return;
    setSelectedContractor(prev => prev ? { ...prev, [editingField.field]: editingField.value } : null);
    setEditingField(null);
    showToast('Поле обновлено', 'success');
  };

  const changeStatus = (newStatus: string) => {
    if (!selectedContractor) return;
    if (newStatus === 'Архив') {
      openArchiveReasonModal(selectedContractor);
      return;
    }
    setSelectedContractor(prev => prev ? { ...prev, status: newStatus } : null);
    setContractors(prev => sortContractors(prev.map(c => c.id === selectedContractor.id ? { ...c, status: newStatus } : c)));
    setIsStatusDropdownOpen(false);
    showToast(`Статус: ${newStatus}`, 'success');
  };

  const setPostEvaluation = (key: string, value: string) => {
    if (!selectedContractor) return;
    setSelectedContractor(prev => prev ? {
      ...prev,
      postEvaluation: { ...prev.postEvaluation, [key]: value }
    } : null);
    showToast('Оценка сохранена', 'success');
  };

  const moveToShortlist = () => {
    if (!selectedContractor) return;
    setSelectedContractor(prev => prev ? { ...prev, status: 'Шорт-лист' } : null);
    setContractors(prev => sortContractors(prev.map(c => 
      c.id === selectedContractor.id ? { ...c, status: 'Шорт-лист' } : c
    )));
    showToast('Подрядчик перенесён в шорт-лист', 'success');
  };

  const sendForReview = () => {
    const select = document.getElementById('reviewSelect') as HTMLSelectElement;
    const manager = select?.value;
    if (!manager) {
      showToast('Выберите менеджера', 'info');
      return;
    }
    showToast(`Отправлено ${manager}`, 'success');
  };

  const [aiMessages, setAiMessages] = useState<{ text: string; type: 'user' | 'bot' }[]>([
    { text: 'Привет! Я помогу найти нужных подрядчиков. Попробуйте запрос:', type: 'bot' }
  ]);
  const [aiInput, setAiInput] = useState('');

  const sendAi = () => {
    if (!aiInput.trim()) return;
    setAiMessages(prev => [...prev, { text: aiInput, type: 'user' }]);
    const prompt = aiInput;
    setAiInput('');
    setTimeout(() => processAiPrompt(prompt), 500);
  };

  const processAiPrompt = (prompt: string) => {
    const lower = prompt.toLowerCase();
    let filtersApplied: string[] = [];
    const specKeywords: Record<string, string> = {
      'брендинг': 'Брендинг', 'айдентика': 'Дизайн и айдентика', 'таргет': 'Таргетированная реклама',
      'контекст': 'Контекстная реклама', 'инфлюенс': 'Инфлюенс-маркетинг', 'seo': 'SEO',
      'контент': 'Контент-маркетинг', 'копирайт': 'Копирайтинг', 'креатив': 'Креативная стратегия',
      'ux': 'UX/UI дизайн', 'ui': 'UX/UI дизайн', 'web': 'Web-разработка', 'веб': 'Web-разработка',
      'no-code': 'No-code разработка', 'nocode': 'No-code разработка', 'исследован': 'Исследования рынка',
      'видео': 'Видео-продакшен', 'pr': 'PR и коммуникации', 'коммуникац': 'PR и коммуникации',
      'growth': 'Growth маркетинг', 'маркетинг': 'Маркетинговая стратегия'
    };
    const statusKeywords: Record<string, string> = {
      'шортлист': 'Шорт-лист', 'шорт-лист': 'Шорт-лист', 'shortlist': 'Шорт-лист', 'скоринг': 'На скоринге',
      'пресейл': 'Готов к пресейлу', 'в работе': 'На проекте / в работе'
    };
    const gradeKeywords: Record<string, string> = {
      'junior': 'Junior', 'младш': 'Junior', 'middle': 'Middle', 'mid': 'Middle', 'senior': 'Senior',
      'сеньор': 'Senior', 'executive': 'Executive', 'c-level': 'C-level'
    };
    let detectedSpec = '', detectedStatus = '', detectedGrade = '';

    for (const [keyword, value] of Object.entries(specKeywords)) {
      if (lower.includes(keyword)) { detectedSpec = value; break; }
    }
    for (const [keyword, value] of Object.entries(statusKeywords)) {
      if (lower.includes(keyword)) { detectedStatus = value; break; }
    }
    for (const [keyword, value] of Object.entries(gradeKeywords)) {
      if (lower.includes(keyword)) { detectedGrade = value; break; }
    }

    if (detectedSpec) {
      setFilterSpec(detectedSpec);
      filtersApplied.push(`Специализация: ${detectedSpec}`);
    }
    if (detectedStatus) {
      setFilterStatus(detectedStatus);
      filtersApplied.push(`Статус: ${detectedStatus}`);
    }
    if (detectedGrade) {
      setFilterGrade(detectedGrade);
      filtersApplied.push(`Грейд: ${detectedGrade}`);
    }

    const count = isViewingArchive ? filteredArchivedContractors.length : filteredContractors.length;
    const response = filtersApplied.length > 0
      ? `✅ Фильтры применены: ${filtersApplied.join(', ')}. Найдено: ${count} подрядчиков.`
      : '🤔 Не удалось определить критерии. Попробуйте уточнить запрос.';

    setAiMessages(prev => [...prev, { text: response, type: 'bot' }]);
  };

  const applySuggestion = (text: string) => {
    setAiInput(text);
    setTimeout(() => sendAi(), 100);
  };

  const onDragStart = (id: number) => {
    setDraggedContractorId(id);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onDrop = (targetId: number) => {
    if (draggedContractorId === null || draggedContractorId === targetId) return;
    const items = [...contractors];
    const sourceIdx = items.findIndex(c => c.id === draggedContractorId);
    const targetIdx = items.findIndex(c => c.id === targetId);
    if (sourceIdx !== -1 && targetIdx !== -1) {
      const [draggedItem] = items.splice(sourceIdx, 1);
      items.splice(targetIdx, 0, draggedItem);
      setContractors(items);
      showToast('Позиция подрядчика обновлена', 'success');
    }
    setDraggedContractorId(null);
  };

  const renderTaskColumns = (c: Contractor) => {
    const tasks = c.tasks || [];
    const defaultTasks = getDefaultTasksForStatus(c.status);
    const todoTasks = [...defaultTasks, ...tasks.filter(t => t.status === 'todo')];
    const inProgressTasks = tasks.filter(t => t.status === 'in-progress');
    const doneTasks = tasks.filter(t => t.status === 'done');

    const filteredTodoTasks = taskFilter === 'mine' 
      ? todoTasks.filter(t => t.assignee === 'Вы' || !t.assignee)
      : todoTasks;
    const filteredInProgressTasks = taskFilter === 'mine'
      ? inProgressTasks.filter(t => t.assignee === 'Вы' || !t.assignee)
      : inProgressTasks;
    const filteredDoneTasks = taskFilter === 'mine'
      ? doneTasks.filter(t => t.assignee === 'Вы' || !t.assignee)
      : doneTasks;

    const renderTaskCard = (task: Task) => {
      const dateStr = task.dueDate ? formatDate(task.dueDate) : '—';
      return (
        <div
          key={task.id}
          className={`task-card ${task.status === 'done' ? 'done' : ''} ${task.priority === 'high' ? 'urgent' : ''}`}
          onClick={(e) => openTaskModal(c.id, task, e)}
        >
          <div className="task-card-title">{task.title}</div>
          <div className="task-card-meta">
            <span className="due"><Calendar size={11} /> {dateStr}</span>
            {task.assignee && <span className="assignee">{task.assignee}</span>}
          </div>
        </div>
      );
    };

    return (
      <div className="task-columns">
        <div className="task-column">
          <div className="task-col-header">
            <span>To Do</span>
            <span className="task-col-count">{filteredTodoTasks.length}</span>
          </div>
          {filteredTodoTasks.length > 0 ? (
            filteredTodoTasks.map(renderTaskCard)
          ) : (
            <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Нет задач</div>
          )}
          <button
            className="btn btn-ghost btn-sm"
            style={{ width: '100%', marginTop: '0.5rem' }}
            onClick={(e) => { e.stopPropagation(); openTaskModal(c.id, null, e); }}
          >
            <Plus size={14} /> Новая
          </button>
        </div>
        <div className="task-column">
          <div className="task-col-header">
            <span>In Progress</span>
            <span className="task-col-count">{filteredInProgressTasks.length}</span>
          </div>
          {filteredInProgressTasks.length > 0 ? (
            filteredInProgressTasks.map(renderTaskCard)
          ) : (
            <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Нет задач</div>
          )}
        </div>
        <div className="task-column">
          <div className="task-col-header">
            <span>Done</span>
            <span className="task-col-count">{filteredDoneTasks.length}</span>
          </div>
          {filteredDoneTasks.length > 0 ? (
            filteredDoneTasks.map(renderTaskCard)
          ) : (
            <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Нет задач</div>
          )}
        </div>
      </div>
    );
  };

  const renderContractorRow = (c: Contractor | ArchivedContractor, isArchived = false) => {
    const lastComm = c.lastCommunication ? formatDate(c.lastCommunication) : '—';
    return (
      <tr
        key={c.id}
        className="contractor-row"
        draggable={!isArchived}
        onDragStart={() => !isArchived && onDragStart(c.id)}
        onDragOver={(e) => !isArchived && onDragOver(e)}
        onDrop={() => !isArchived && onDrop(c.id)}
        onClick={() => openModal(c)}
      >
        <td>
          <div className="name-cell-wrap">
            {c.photo ? (
              <img src={c.photo} className="list-avatar" alt={c.name} />
            ) : (
              <div className="list-avatar placeholder">{c.name.charAt(0)}</div>
            )}
            <span className="name-text">{c.name}</span>
            {!isArchived && isStale(c) && (
              <span className="status-tag" style={{ marginLeft: 8, background: 'rgba(245,158,11,0.15)', color: '#fbbf24' }}>
                Требует обновления
              </span>
            )}
          </div>
        </td>
        <td>{c.spec}</td>
        <td style={{ textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 600 }}>{displayGrade(c)}</td>
        <td>{c.type}</td>
        <td><span className={`status-tag ${getStatusClass(c.status)}`}>{c.status}</span></td>
        <td style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{lastComm}</td>
        {isArchived && <td style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{(c as ArchivedContractor).archiveReason || '—'}</td>}
        <td style={{ textAlign: 'center' }}><ChevronRight size={16} style={{ color: 'var(--text-muted)' }} /></td>
      </tr>
    );
  };

  const renderModalContent = () => {
    if (!selectedContractor) return null;
    const c = selectedContractor;
    const isArchived = !!(c as ArchivedContractor).archivedAt;

    const avatarHtml = c.photo ? (
      <img src={c.photo} className="modal-avatar" alt={c.name} />
    ) : (
      <div className="modal-avatar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: 'var(--text-muted)', background: 'var(--bg-hover)' }}>
        {c.name.charAt(0)}
      </div>
    );

    const resumeLink = c.resume && c.resume !== '#' && c.resume !== '—' ? (
      <a href={c.resume} target="_blank" rel="noopener noreferrer"><ExternalLink size={13} /> Открыть</a>
    ) : <span style={{ color: 'var(--text-muted)' }}>—</span>;

    const portfolioLink = c.portfolio && c.portfolio !== '—' && c.portfolio !== '#' ? (
      <a href={c.portfolio} target="_blank" rel="noopener noreferrer"><ExternalLink size={13} /> {c.portfolio}</a>
    ) : <span style={{ color: 'var(--text-muted)' }}>—</span>;

    const archiveReasonHtml = isArchived && c.archiveReason ? (
      <div className="info-block" style={{ marginTop: '1rem' }}>
        <div className="info-block-title">Причина архивации</div>
        <div className="description-box" style={{ padding: '0.75rem 1rem' }}>{c.archiveReason}</div>
      </div>
    ) : null;

    const completeness = calculateCompletenessDetails(c);
    const missingListHtml = completeness.missing.length > 0 ? (
      <ul>{completeness.missing.map(item => <li key={item}>{item}</li>)}</ul>
    ) : (
      <div style={{ color: 'var(--accent-green)' }}>✓ Все ключевые поля заполнены</div>
    );

    const postEvaluationSection = c.status === 'Нужна пост-оценка' && !isArchived ? (
      <div className="post-eval-section">
        <div className="post-eval-title">
          <ClipboardCheck size={18} />
          Пост-оценка подрядчика
        </div>
        <div className="post-eval-subtitle">
          Заполните оценку по критериям, затем выберите действие
        </div>
        <div className="eval-grid">
          {POST_EVALUATION_CRITERIA.map(item => (
            <div key={item.key} className="eval-row">
              <div className="eval-criterion">{item.label}</div>
              <select
                className="input-field"
                value={c.postEvaluation?.[item.key] || ''}
                onChange={(e) => setPostEvaluation(item.key, e.target.value)}
              >
                <option value="">Выберите оценку</option>
                {EVALUATION_OPTIONS.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <div className="post-eval-actions">
          <button className="btn btn-danger" onClick={() => openArchiveReasonModal(c)}>
            <Archive size={16} /> Перенести в архив
          </button>
          <button className="btn btn-gradient" onClick={moveToShortlist}>
            <Star size={16} /> Перенести в шорт-лист
          </button>
        </div>
      </div>
    ) : null;

    const postEvalResults = c.status === 'Нужна пост-оценка' && hasPostEvaluationData(c) ? (
      <div className="post-eval-results">
        <div className="post-eval-results-title">
          <CheckCircle size={18} />
          Результаты пост-оценки
        </div>
        <div className="result-grid">
          {POST_EVALUATION_CRITERIA.map(item => (
            <div key={item.key} className="result-item">
              <div className="result-item-label">{item.label}</div>
              <div className="result-item-value">{c.postEvaluation?.[item.key] || '—'}</div>
            </div>
          ))}
        </div>
      </div>
    ) : null;

    return (
      <>
        <div className="modal-header">
          <div className="modal-header-left">
            {avatarHtml}
            <div>
              <div className="modal-name">{c.name}</div>
              <div className="modal-meta">
                <div className="status-dropdown-wrap">
                  <button
                    className={`status-dropdown-btn status-tag ${getStatusClass(c.status)}`}
                    onClick={(e) => { e.stopPropagation(); setIsStatusDropdownOpen(!isStatusDropdownOpen); }}
                  >
                    <span>{c.status}</span>
                    <ChevronDown size={12} className={`chevron ${isStatusDropdownOpen ? 'open' : ''}`} />
                  </button>
                  <div className={`status-dropdown-menu ${isStatusDropdownOpen ? 'open' : ''}`}>
                    {ALL_STATUSES.map(s => (
                      <button
                        key={s}
                        className={`status-option ${s === c.status ? 'active' : ''}`}
                        onClick={() => changeStatus(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>ID: #{String(c.id).padStart(4, '0')}</span>
              </div>
            </div>
          </div>
          <button className="modal-close" onClick={closeModal}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-left">
            <div className="contact-list">
              <div className="contact-item">
                <Phone size={15} />
                <span>{c.phone || '—'}</span>
              </div>
              <div className="contact-item">
                <Send size={15} />
                <span style={{ color: 'var(--accent-blue)' }}>{c.telegram || '—'}</span>
              </div>
              <div className="contact-item">
                <Briefcase size={15} />
                <span>{c.type || '—'}</span>
              </div>
              <div>
                <div className="contact-item">
                  <Award size={15} />
                  <span>Грейд: {displayGrade(c)}</span>
                </div>
                <div className={`grade-agreement ${gradeAgreementClass(c)}`}>
                  {gradeAgreementText(c)}
                </div>
              </div>
              <div className="contact-item">
                <Clock size={15} />
                <span>Опыт: {c.experience || '—'}</span>
              </div>
            </div>

            <hr className="divider" />

            <div>
              <div className="info-block-title" style={{ marginBottom: '0.5rem' }}>Резюме</div>
              <div style={{ fontSize: '0.85rem', marginBottom: '0.75rem' }}>{resumeLink}</div>
              <div className="info-block-title">Портфолио</div>
              <div style={{ fontSize: '0.85rem' }}>{portfolioLink}</div>
            </div>

            {archiveReasonHtml}
          </div>

          <div className="modal-right">
            <div className="detail-grid">
              <div className="detail-item">
                <div className="detail-item-label">Специализация</div>
                <div className="editable-field">
                  {editingField?.field === 'spec' ? (
                    <input
                      type="text"
                      className="editable-input"
                      value={editingField.value}
                      onChange={(e) => setEditingField({ field: 'spec', value: e.target.value })}
                      onBlur={saveFieldEdit}
                      onKeyDown={(e) => e.key === 'Enter' && saveFieldEdit()}
                      autoFocus
                    />
                  ) : (
                    <>
                      <div className="detail-item-value editable-field-value" data-field="spec">{c.spec || '—'}</div>
                      <button className="edit-btn" onClick={() => startEditField('spec')}>
                        <Edit2 size={14} />
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-item-label">Тип клиента</div>
                <div className="editable-field">
                  {editingField?.field === 'clientType' ? (
                    <input
                      type="text"
                      className="editable-input"
                      value={editingField.value}
                      onChange={(e) => setEditingField({ field: 'clientType', value: e.target.value })}
                      onBlur={saveFieldEdit}
                      onKeyDown={(e) => e.key === 'Enter' && saveFieldEdit()}
                      autoFocus
                    />
                  ) : (
                    <>
                      <div className="detail-item-value editable-field-value" data-field="clientType">{c.clientType || '—'}</div>
                      <button className="edit-btn" onClick={() => startEditField('clientType')}>
                        <Edit2 size={14} />
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-item-label">Роль</div>
                <div className="editable-field">
                  {editingField?.field === 'role' ? (
                    <input
                      type="text"
                      className="editable-input"
                      value={editingField.value}
                      onChange={(e) => setEditingField({ field: 'role', value: e.target.value })}
                      onBlur={saveFieldEdit}
                      onKeyDown={(e) => e.key === 'Enter' && saveFieldEdit()}
                      autoFocus
                    />
                  ) : (
                    <>
                      <div className="detail-item-value editable-field-value" data-field="role">{c.role || '—'}</div>
                      <button className="edit-btn" onClick={() => startEditField('role')}>
                        <Edit2 size={14} />
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-item-label">Open-ended</div>
                <div className={`detail-item-value ${c.openEnded === 'Да' ? 'yes' : (c.openEnded === 'Нет' ? 'no' : '')}`}>
                  {c.openEnded || '—'}
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-item-label">Создана</div>
                <div className="detail-item-value">{formatDate(c.createdAt)}</div>
              </div>
              <div className="detail-item">
                <div className="detail-item-label">Опыт</div>
                <div className="editable-field">
                  {editingField?.field === 'experience' ? (
                    <input
                      type="text"
                      className="editable-input"
                      value={editingField.value}
                      onChange={(e) => setEditingField({ field: 'experience', value: e.target.value })}
                      onBlur={saveFieldEdit}
                      onKeyDown={(e) => e.key === 'Enter' && saveFieldEdit()}
                      autoFocus
                    />
                  ) : (
                    <>
                      <div className={`detail-item-value editable-field-value ${c.experience === '0 лет' ? 'zero-exp' : ''}`} data-field="experience">
                        {c.experience || '—'}
                      </div>
                      <button className="edit-btn" onClick={() => startEditField('experience')}>
                        <Edit2 size={14} />
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-item-label">Грейд</div>
                <div className="editable-field">
                  {editingField?.field === 'grade' ? (
                    <input
                      type="text"
                      className="editable-input"
                      value={editingField.value}
                      onChange={(e) => setEditingField({ field: 'grade', value: e.target.value })}
                      onBlur={saveFieldEdit}
                      onKeyDown={(e) => e.key === 'Enter' && saveFieldEdit()}
                      autoFocus
                    />
                  ) : (
                    <>
                      <div className="detail-item-value editable-field-value" data-field="grade">{displayGrade(c)}</div>
                      <button className="edit-btn" onClick={() => startEditField('grade')}>
                        <Edit2 size={14} />
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-item-label">Согласие</div>
                <div className={`grade-agreement ${gradeAgreementClass(c)}`} style={{ marginTop: 0 }}>
                  {gradeAgreementText(c)}
                </div>
              </div>
            </div>

            <div className="completeness-card">
              <div className="missing-tooltip">
                <div className="missing-tooltip-title">Что нужно заполнить:</div>
                {missingListHtml}
              </div>
              <div className="info-block-title">Заполненность профиля</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{completeness.percent}%</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>наведите для деталей</span>
              </div>
              <div className="completeness-bar">
                <div className="completeness-fill" style={{ width: `${completeness.percent}%` }}></div>
              </div>
            </div>

            {postEvalResults}
            {postEvaluationSection}

            {!isArchived && (
              <div style={{ background: 'rgba(54,134,255,0.05)', border: '1px solid rgba(54,134,255,0.2)', borderRadius: '0.5rem', padding: '1rem' }}>
                <div className="info-block-title" style={{ color: 'var(--accent-blue)' }}>Отправить на проверку</div>
                <select id="reviewSelect" className="input-field" style={{ marginBottom: '0.5rem' }}>
                  <option value="">Выберите ответственного</option>
                  {REVIEW_MANAGERS.map(name => <option key={name} value={name}>{name}</option>)}
                </select>
                <button className="btn btn-gradient btn-sm btn-full" onClick={sendForReview}>
                  Отправить на проверку
                </button>
              </div>
            )}

            <div className="task-tracker-section">
              <h3><LayoutList size={18} /> Задачи</h3>
              <div className="task-toolbar">
                <select className="input-field" value={taskFilter} onChange={(e) => setTaskFilter(e.target.value as 'all' | 'mine')}>
                  <option value="all">Все</option>
                  <option value="mine">Только мои</option>
                </select>
                <button className="btn btn-ghost btn-sm" onClick={(e) => { e.stopPropagation(); openTaskModal(c.id, null, e); }}>
                  <Plus size={14} /> Новая
                </button>
              </div>
              {renderTaskColumns(c)}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={closeModal}>Закрыть</button>
          {isArchived && (
            <button className="btn btn-secondary" onClick={() => restoreFromArchive(c as ArchivedContractor)}>
              <RotateCcw size={14} /> Восстановить
            </button>
          )}
          <button className="btn btn-gradient" onClick={saveContractor}>
            <Save size={14} /> Сохранить
          </button>
        </div>
      </>
    );
  };

  const renderCreateModalContent = () => {
    if (!selectedContractor) return null;
    return (
      <>
        <div className="modal-header">
          <h2>Новый подрядчик</h2>
          <button className="modal-close" onClick={closeCreateModal}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-left">
            <div className="info-block">
              <div className="info-block-title">Фото</div>
              <input
                id="createPhoto"
                type="text"
                className="input-field"
                placeholder="URL фото"
                value={selectedContractor.photo || ''}
                onChange={(e) => setSelectedContractor(prev => prev ? { ...prev, photo: e.target.value } : null)}
              />
            </div>

            <div className="info-block">
              <div className="info-block-title">Контакты</div>
              <input
                id="createName"
                type="text"
                className="input-field"
                placeholder="ФИО"
                style={{ marginBottom: '0.5rem' }}
                value={selectedContractor.name}
                onChange={(e) => setSelectedContractor(prev => prev ? { ...prev, name: e.target.value } : null)}
              />
              <input
                id="createTelegram"
                type="text"
                className="input-field"
                placeholder="Telegram"
                style={{ marginBottom: '0.5rem' }}
                value={selectedContractor.telegram || ''}
                onChange={(e) => setSelectedContractor(prev => prev ? { ...prev, telegram: e.target.value } : null)}
              />
              <input
                id="createPhone"
                type="text"
                className="input-field"
                placeholder="Телефон"
                value={selectedContractor.phone || ''}
                onChange={(e) => setSelectedContractor(prev => prev ? { ...prev, phone: e.target.value } : null)}
              />
            </div>
          </div>

          <div className="modal-right">
            <div className="detail-grid">
              <div className="detail-item">
                <div className="detail-item-label">Специализация</div>
                <select
                  id="createSpec"
                  className="input-field"
                  value={selectedContractor.spec}
                  onChange={(e) => setSelectedContractor(prev => prev ? { ...prev, spec: e.target.value } : null)}
                >
                  <option value="">Выберите</option>
                  {SPECIALIZATIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="detail-item">
                <div className="detail-item-label">Тип</div>
                <select
                  id="createType"
                  className="input-field"
                  value={selectedContractor.type}
                  onChange={(e) => setSelectedContractor(prev => prev ? { ...prev, type: e.target.value } : null)}
                >
                  <option>Самостоятельный специалист</option>
                  <option>Агенство</option>
                  <option>Проектная команда</option>
                </select>
              </div>

              <div className="detail-item">
                <div className="detail-item-label">Статус</div>
                <select
                  id="createStatus"
                  className="input-field"
                  value={selectedContractor.status}
                  onChange={(e) => setSelectedContractor(prev => prev ? { ...prev, status: e.target.value } : null)}
                >
                  {ALL_STATUSES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>

              <div className="detail-item">
                <div className="detail-item-label">Грейд</div>
                <select
                  id="createGrade"
                  className="input-field"
                  value={selectedContractor.grade}
                  onChange={(e) => setSelectedContractor(prev => prev ? { ...prev, grade: e.target.value } : null)}
                >
                  <option>Junior</option>
                  <option>Middle</option>
                  <option>Senior</option>
                  <option>Executive</option>
                  <option>C-level</option>
                  <option>N/A</option>
                </select>
              </div>

              <div className="detail-item">
                <div className="detail-item-label">Опыт</div>
                <input
                  id="createExperience"
                  type="text"
                  className="input-field"
                  placeholder="Например: 5 лет"
                  value={selectedContractor.experience || ''}
                  onChange={(e) => setSelectedContractor(prev => prev ? { ...prev, experience: e.target.value } : null)}
                />
              </div>

              <div className="detail-item">
                <div className="detail-item-label">Тип клиента</div>
                <input
                  id="createClientType"
                  type="text"
                  className="input-field"
                  placeholder="Клиенты"
                  value={selectedContractor.clientType || ''}
                  onChange={(e) => setSelectedContractor(prev => prev ? { ...prev, clientType: e.target.value } : null)}
                />
              </div>

              <div className="detail-item">
                <div className="detail-item-label">Роль</div>
                <input
                  id="createRole"
                  type="text"
                  className="input-field"
                  placeholder="Роль"
                  value={selectedContractor.role || ''}
                  onChange={(e) => setSelectedContractor(prev => prev ? { ...prev, role: e.target.value } : null)}
                />
              </div>

              <div className="detail-item">
                <div className="detail-item-label">Open-ended</div>
                <select
                  id="createOpenEnded"
                  className="input-field"
                  value={selectedContractor.openEnded || ''}
                  onChange={(e) => setSelectedContractor(prev => prev ? { ...prev, openEnded: e.target.value } : null)}
                >
                  <option value="">Выберите</option>
                  <option value="Да">Да</option>
                  <option value="Нет">Нет</option>
                  <option value="Иногда">Иногда</option>
                </select>
              </div>

              <div className="detail-item">
                <div className="detail-item-label">Резюме</div>
                <input
                  id="createResume"
                  type="text"
                  className="input-field"
                  placeholder="Ссылка на резюме"
                  value={selectedContractor.resume || ''}
                  onChange={(e) => setSelectedContractor(prev => prev ? { ...prev, resume: e.target.value } : null)}
                />
              </div>

              <div className="detail-item">
                <div className="detail-item-label">Портфолио</div>
                <input
                  id="createPortfolio"
                  type="text"
                  className="input-field"
                  placeholder="Ссылка на портфолио"
                  value={selectedContractor.portfolio || ''}
                  onChange={(e) => setSelectedContractor(prev => prev ? { ...prev, portfolio: e.target.value } : null)}
                />
              </div>
            </div>

            <div className="info-block">
              <div className="info-block-title">Описание</div>
              <textarea
                id="createDescription"
                className="input-field"
                placeholder="О навыках подрядчика..."
                value={selectedContractor.description || ''}
                onChange={(e) => setSelectedContractor(prev => prev ? { ...prev, description: e.target.value } : null)}
              />
            </div>

            <div style={{ textAlign: 'right' }}>
              <button className="btn btn-gradient" onClick={createContractor}>Создать</button>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderTaskModalContent = () => {
    if (!editingTask) return null;
    return (
      <>
        <div className="modal-header">
          <h2>{editingTask.id.startsWith('task-') ? 'Новая задача' : 'Задача'}</h2>
          <button className="modal-close" onClick={closeTaskModal}>
            <X size={18} />
          </button>
        </div>
        <div className="modal-body">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Название</label>
              <input
                id="taskTitle"
                type="text"
                className="input-field"
                value={editingTask.title}
                onChange={(e) => setEditingTask(prev => prev ? { ...prev, title: e.target.value } : null)}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Описание</label>
              <textarea
                id="taskDescription"
                className="input-field"
                value={editingTask.description || ''}
                onChange={(e) => setEditingTask(prev => prev ? { ...prev, description: e.target.value } : null)}
                placeholder="Описание задачи..."
              />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Срок</label>
              <input
                id="taskDate"
                type="date"
                className="input-field"
                value={editingTask.dueDate ? new Date(editingTask.dueDate).toISOString().split('T')[0] : ''}
                onChange={(e) => setEditingTask(prev => prev ? { ...prev, dueDate: new Date(e.target.value).toISOString() } : null)}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Ответственный</label>
              <select
                id="taskAssignee"
                className="input-field"
                value={editingTask.assignee || ''}
                onChange={(e) => setEditingTask(prev => prev ? { ...prev, assignee: e.target.value } : null)}
              >
                <option value="">Не назначен</option>
                {REVIEW_MANAGERS.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Приоритет</label>
              <select
                id="taskPriority"
                className="input-field"
                value={editingTask.priority || 'medium'}
                onChange={(e) => setEditingTask(prev => prev ? { ...prev, priority: e.target.value as 'low' | 'medium' | 'high' } : null)}
              >
                <option value="low">Низкий</option>
                <option value="medium">Средний</option>
                <option value="high">Высокий</option>
              </select>
            </div>
            {!editingTask.id.startsWith('task-') && (
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Статус</label>
                <select
                  id="taskStatus"
                  className="input-field"
                  value={editingTask.status}
                  onChange={(e) => setEditingTask(prev => prev ? { ...prev, status: e.target.value as 'todo' | 'in-progress' | 'done' } : null)}
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
            )}
          </div>
        </div>
        <div className="modal-footer">
          {!editingTask.id.startsWith('task-') && (
            <button className="btn btn-danger" onClick={deleteTask}>Удалить</button>
          )}
          <button className="btn btn-ghost" onClick={closeTaskModal}>Закрыть</button>
          <button className="btn btn-gradient" onClick={saveTask}>
            {editingTask.id.startsWith('task-') ? 'Создать' : 'Сохранить'}
          </button>
        </div>
      </>
    );
  };

  return (
    <div className="page-wrapper" onClick={() => setIsStatusDropdownOpen(false)}>
      <div className="page-header">
        <div>
          <h1>База подрядчиков</h1>
          <div className="subtitle">База исполнителей Sixth Sense Bureau</div>
        </div>
        <div className="header-controls">
          <button className="theme-toggle" onClick={(e) => { e.stopPropagation(); toggleTheme(); }} title="Переключить тему">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="btn btn-secondary" onClick={(e) => { e.stopPropagation(); showArchive(); }}>
            <Archive size={16} /> Архив
          </button>
          <button className="btn btn-gradient" onClick={(e) => { e.stopPropagation(); openCreateModal(); }}>
            <Plus size={16} /> Добавить подрядчика
          </button>
        </div>
      </div>

      <div className="main-layout">
        <div>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <input
              id="filterSearch"
              className="input-field"
              style={{ maxWidth: '240px' }}
              placeholder="Поиск по ФИО…"
              value={filterSearch}
              onChange={(e) => setFilterSearch(e.target.value)}
            />

            <select
              id="filterSpec"
              className="input-field"
              style={{ maxWidth: '240px' }}
              value={filterSpec}
              onChange={(e) => setFilterSpec(e.target.value)}
            >
              <option value="">Все специализации</option>
              {SPECIALIZATIONS.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            <select
              id="filterGrade"
              className="input-field"
              style={{ maxWidth: '180px' }}
              value={filterGrade}
              onChange={(e) => setFilterGrade(e.target.value)}
            >
              <option value="">Все грейды</option>
              <option value="Junior">Junior</option>
              <option value="Middle">Middle</option>
              <option value="Senior">Senior</option>
              <option value="Executive">Executive</option>
              <option value="C-level">C-level</option>
              <option value="N/A">N/A</option>
            </select>

            {!isViewingArchive && (
              <select
                id="filterStatus"
                className="input-field"
                style={{ maxWidth: '240px' }}
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="">Все статусы</option>
                {ALL_STATUSES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            )}

            {isViewingArchive && (
              <button className="btn btn-ghost" onClick={closeArchive}>
                <RotateCcw size={16} /> Назад к списку
              </button>
            )}
          </div>

          <div className="table-wrapper">
            <table className="contractor-table">
              <thead>
                <tr>
                  <th style={{ width: '24%' }}>ФИО</th>
                  <th style={{ width: '16%' }}>Специализация</th>
                  <th style={{ width: '10%' }}>Грейд</th>
                  <th style={{ width: '14%' }}>Тип подрядчика</th>
                  <th style={{ width: '16%' }}>Статус скоринга</th>
                  <th style={{ width: '14%' }}>Последняя коммуникация</th>
                  {isViewingArchive && <th style={{ width: '14%' }}>Причина архивации</th>}
                  <th style={{ width: '40px' }}></th>
                </tr>
              </thead>
              <tbody id="tableBody">
                {isViewingArchive ? (
                  filteredArchivedContractors.length === 0 ? (
                    <tr>
                      <td colSpan={isViewingArchive ? 8 : 7} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                        Архив пуст
                      </td>
                    </tr>
                  ) : (
                    filteredArchivedContractors.map(c => renderContractorRow(c, true))
                  )
                ) : filteredContractors.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                      Подрядчики не найдены
                    </td>
                  </tr>
                ) : (
                  filteredContractors.map(c => renderContractorRow(c, false))
                )}
              </tbody>
            </table>
          </div>

          <div id="resultsCount" style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Показано: {isViewingArchive ? filteredArchivedContractors.length : filteredContractors.length} из{' '}
            {isViewingArchive ? archivedContractors.length : contractors.length}
          </div>
        </div>

        <div className="ai-sidebar">
          <div className="ai-block">
            <div className="ai-block-header">
              <Sparkles size={18} style={{ color: 'var(--accent)' }} />
              <h3>AI Ассистент</h3>
            </div>
            <p>Задайте вопрос, и я подберу подрядчиков по заданным критериям.</p>
            <div className="ai-chat-area" id="aiChat">
              {aiMessages.map((msg, i) => (
                <div key={i} className={`ai-msg ${msg.type}`}>{msg.text}</div>
              ))}
            </div>
            <div className="ai-input-row">
              <input
                id="aiInput"
                className="input-field"
                placeholder="Введите запрос…"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendAi()}
              />
              <button className="btn btn-gradient btn-sm" onClick={sendAi}>
                <ArrowUp size={14} />
              </button>
            </div>
            <div className="ai-suggestions">
              <button className="ai-suggestion" onClick={() => applySuggestion('Пришли шортлист подрядчиков по брендингу')}>
                «Пришли шортлист подрядчиков»
              </button>
              <button className="ai-suggestion" onClick={() => applySuggestion('Покажи всех Senior подрядчиков')}>
                «Покажи всех Senior»
              </button>
              <button className="ai-suggestion" onClick={() => applySuggestion('Кто готов к пресейлу?')}>
                «Готов к пресейлу?»
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`modal-overlay ${isModalOpen ? 'open' : ''}`} onClick={(e) => e.target === e.currentTarget && closeModal()}>
        <div className="modal" id="modalContent">
          {renderModalContent()}
        </div>
      </div>

      <div className={`modal-overlay ${isCreateModalOpen ? 'open' : ''}`} onClick={(e) => e.target === e.currentTarget && closeCreateModal()}>
        <div className="modal" id="createModalContent">
          {renderCreateModalContent()}
        </div>
      </div>

      <div className={`archive-reason-modal ${isArchiveReasonModalOpen ? 'open' : ''}`} onClick={(e) => e.target === e.currentTarget && closeArchiveReasonModal()}>
        <div className="archive-reason-box">
          <h3>Причина архивации</h3>
          <div className="reason-options" id="reasonOptions">
            {ARCHIVE_REASONS.map((reason) => (
              <button
                key={reason}
                className={`reason-option ${selectedArchiveReason === reason ? 'selected' : ''}`}
                onClick={() => setSelectedArchiveReason(reason)}
              >
                {reason}
              </button>
            ))}
          </div>
          <div className="archive-reason-actions">
            <button className="btn btn-ghost" onClick={closeArchiveReasonModal}>Отмена</button>
            <button className="btn btn-gradient" onClick={confirmArchive}>Архивировать</button>
          </div>
        </div>
      </div>

      <div className={`modal-overlay ${isTaskModalOpen ? 'open' : ''}`} onClick={(e) => e.target === e.currentTarget && closeTaskModal()}>
        <div className="modal" id="taskModal" style={{ maxWidth: '600px' }}>
          {renderTaskModalContent()}
        </div>
      </div>

      <div className="toast-container" id="toastContainer">
        {toasts.map(toast => (
          <div key={toast.id} className={`toast ${toast.type}`}>
            {toast.type === 'success' && <CheckCircleIcon size={16} />}
            {toast.type === 'info' && <Info size={16} />}
            {toast.type === 'warning' && <AlertTriangle size={16} />}
            {toast.message}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
