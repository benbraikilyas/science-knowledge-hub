const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=70`;

export const CATEGORY_IMAGES: Record<string, string> = {
  space: unsplash('photo-1446776811953-b23d57bd21aa'),
  astronomy: unsplash('photo-1462331940025-496dfbfc7564'),
  physics: unsplash('photo-1509228468518-180dd4864904'),
  'quantum-physics': unsplash('photo-1502139214982-d0ad755818d8'),
  scientists: unsplash('photo-1532187863486-abf9dbad1b69'),
  'scientific-theories': unsplash('photo-1451187580459-43490279c0fa'),
  'scientific-experiments': unsplash('photo-1576086213369-97a306d36557'),
  biology: unsplash('photo-1530026405186-ed1f139313f8'),
  'artificial-intelligence': unsplash('photo-1485827404703-89b55fcc595e'),
  robotics: unsplash('photo-1531746790731-6c087fecd65a'),
  technology: unsplash('photo-1518770660439-4636190af475'),
  'history-of-science': unsplash('photo-1481627834876-b7833e8f5570'),
  books: unsplash('photo-1497633762265-9d179a990aa6'),
  'space-missions': unsplash('photo-1541185933-ef5d8ed016c2'),
  mathematics: unsplash('photo-1635070041078-e363dbe005cb'),
  'future-technologies': unsplash('photo-1531297484001-80022131f5a1'),
};
