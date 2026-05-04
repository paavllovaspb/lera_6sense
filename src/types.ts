export interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
  dueDate: string;
  assignee?: string;
  isDefault?: boolean;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
}

export interface Contractor {
  id: number;
  name: string;
  photo?: string;
  phone?: string;
  telegram?: string;
  grade: string;
  gradeAgreement: boolean | null;
  type: string;
  spec: string;
  experience: string;
  clientType: string;
  role: string;
  openEnded: string;
  description: string;
  resume: string;
  portfolio: string;
  status: string;
  managerTask: string;
  createdAt: string;
  lastCommunication: string;
  postEvaluation: Record<string, string>;
  archiveReason?: string | null;
  archivedAt?: string;
  tasks?: Task[];
  [key: string]: unknown;
}

export interface ArchivedContractor extends Contractor {
  archivedAt: string;
  archiveReason: string;
}

export type Theme = 'light' | 'dark';

export const SPECIALIZATIONS = [
  'Дизайн и айдентика', 'Таргетированная реклама', 'Контекстная реклама', 'Инфлюенс-маркетинг',
  'SEO', 'Контент-маркетинг', 'Копирайтинг', 'Брендинг', 'Креативная стратегия', 'UX/UI дизайн',
  'Web-разработка', 'No-code разработка', 'Исследования рынка', 'Видео-продакшен',
  'PR и коммуникации', 'Growth маркетинг', 'Маркетинговая стратегия'
];

export const REVIEW_MANAGERS = ['Анна Махова', 'Арина Зотова', 'Владимир Мотин', 'Андрей Сагин', 'Дмитрий Пащенко'];

export const ARCHIVE_REASONS = [
  'Отказался от сотрудничества',
  'Не выходит на связь',
  'Несоответствие квалификации',
  'Зарплатные ожидания',
  'График работы'
];

export const POST_EVALUATION_CRITERIA = [
  { key: 'businessResult', label: 'Был ориентирован на бизнес-результат' },
  { key: 'deadlines', label: 'Соблюдает сроки договоренностей' },
  { key: 'communication', label: 'Коммуникационные навыки' },
  { key: 'clientExpectations', label: 'Интересуется ожиданием клиента' },
  { key: 'initiative', label: 'Инициативен' }
];

export const EVALUATION_OPTIONS = ['Отлично', 'Хорошо', 'Удовлетворительно', 'Не удовлетворительно'];

export const TASKS_BY_STATUS: Record<string, { title: string; daysOffset: number }[]> = {
  'На скоринге': [
    { title: 'Посмотреть портфолио', daysOffset: 1 },
    { title: 'Назначить звонок', daysOffset: 2 },
    { title: 'Отправить запрос слотов на ближайшую неделю', daysOffset: 3 },
    { title: 'Отправить презентацию по онбордингу', daysOffset: 5 }
  ],
  'Нужно запросить документы': [
    { title: 'Запросить документы (NDA + рамочный договор)', daysOffset: 1 }
  ]
};

export const STATUS_ORDER = [
  'На скоринге', 'Шорт-лист', 'Первичный скоринг пройден', 'Нужно запросить документы',
  'Документы получены', 'Готов к пресейлу', 'Согласован на пресейл', 'На проекте / в работе', 'Нужна пост-оценка'
];

export const ALL_STATUSES = [
  'На скоринге', 'Шорт-лист', 'Первичный скоринг пройден', 'Нужно запросить документы',
  'Документы получены', 'Готов к пресейлу', 'Согласован на пресейл', 'На проекте / в работе', 'Нужна пост-оценка', 'Архив'
];
