import type { Person, KarajahData, RelResult, Stats } from './types'

const raw: Omit<Person, 'monogramAr' | 'monogramEn'>[] = [
  { id: 'g0-1', gen: 0, fatherId: null, nameAr: 'ناصر', nameEn: 'Nasir', firstAr: 'ناصر', firstEn: 'Nasir', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },

  { id: 'g1-1', gen: 1, fatherId: 'g0-1', nameAr: 'جودة', nameEn: 'Jawda', firstAr: 'جودة', firstEn: 'Jawda', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g1-2', gen: 1, fatherId: 'g0-1', nameAr: 'ذاكر', nameEn: 'Dhakar', firstAr: 'ذاكر', firstEn: 'Dhakar', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },

  { id: 'g2-1', gen: 2, fatherId: 'g1-1', nameAr: 'مصطفى', nameEn: 'Mustafa', firstAr: 'مصطفى', firstEn: 'Mustafa', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g2-2', gen: 2, fatherId: 'g1-1', nameAr: 'ناصر', nameEn: 'Nasir', firstAr: 'ناصر', firstEn: 'Nasir', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g2-3', gen: 2, fatherId: 'g1-1', nameAr: 'أحمد', nameEn: 'Ahmad', firstAr: 'أحمد', firstEn: 'Ahmad', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g2-4', gen: 2, fatherId: 'g1-1', nameAr: 'طه', nameEn: 'Taha', firstAr: 'طه', firstEn: 'Taha', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g2-5', gen: 2, fatherId: 'g1-2', nameAr: 'الهودلي', nameEn: 'Al-Howdli', firstAr: 'الهودلي', firstEn: 'Al-Howdli', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g2-6', gen: 2, fatherId: 'g1-2', nameAr: 'معروف', nameEn: 'Maruf', firstAr: 'معروف', firstEn: 'Maruf', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },

  { id: 'g3-1', gen: 3, fatherId: 'g2-1', nameAr: 'محمد', nameEn: 'Muhammad', firstAr: 'محمد', firstEn: 'Muhammad', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g3-2', gen: 3, fatherId: 'g2-1', nameAr: 'عبدالله', nameEn: 'Abdullah', firstAr: 'عبدالله', firstEn: 'Abdullah', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g3-3', gen: 3, fatherId: 'g2-1', nameAr: 'محمود', nameEn: 'Mahmoud', firstAr: 'محمود', firstEn: 'Mahmoud', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g3-4', gen: 3, fatherId: 'g2-1', nameAr: 'حسين', nameEn: 'Husayn', firstAr: 'حسين', firstEn: 'Husayn', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },

  { id: 'g4-1', gen: 4, fatherId: 'g3-1', nameAr: 'هلال', nameEn: 'Hilal', firstAr: 'هلال', firstEn: 'Hilal', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g4-2', gen: 4, fatherId: 'g3-2', nameAr: 'أحمد', nameEn: 'Ahmad', firstAr: 'أحمد', firstEn: 'Ahmad', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g4-3', gen: 4, fatherId: 'g3-3', nameAr: 'طه', nameEn: 'Taha', firstAr: 'طه', firstEn: 'Taha', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g4-4', gen: 4, fatherId: 'g3-3', nameAr: 'مطر', nameEn: 'Matar', firstAr: 'مطر', firstEn: 'Matar', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g4-5', gen: 4, fatherId: 'g3-4', nameAr: 'عبدالقادر', nameEn: 'Abd al-Qadir', firstAr: 'عبدالقادر', firstEn: 'Abd al-Qadir', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g4-6', gen: 4, fatherId: 'g3-4', nameAr: 'ابراهيم', nameEn: 'Ibrahim', firstAr: 'ابراهيم', firstEn: 'Ibrahim', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },

  { id: 'g5-1', gen: 5, fatherId: 'g4-1', nameAr: 'رجب', nameEn: 'Rajab', firstAr: 'رجب', firstEn: 'Rajab', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g5-2', gen: 5, fatherId: 'g4-1', nameAr: 'نظمي', nameEn: 'Nazmi', firstAr: 'نظمي', firstEn: 'Nazmi', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g5-3', gen: 5, fatherId: 'g4-2', nameAr: 'سليم', nameEn: 'Salim', firstAr: 'سليم', firstEn: 'Salim', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g5-4', gen: 5, fatherId: 'g4-4', nameAr: 'عطاالله', nameEn: 'Ata Allah', firstAr: 'عطاالله', firstEn: 'Ata Allah', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g5-5', gen: 5, fatherId: 'g4-4', nameAr: 'حمدالله', nameEn: 'Hamd Allah', firstAr: 'حمدالله', firstEn: 'Hamd Allah', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g5-6', gen: 5, fatherId: 'g4-4', nameAr: 'عطية', nameEn: 'Atiyya', firstAr: 'عطية', firstEn: 'Atiyya', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g5-7', gen: 5, fatherId: 'g4-5', nameAr: 'صبري', nameEn: 'Sabri', firstAr: 'صبري', firstEn: 'Sabri', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g5-8', gen: 5, fatherId: 'g4-5', nameAr: 'حسين', nameEn: 'Husayn', firstAr: 'حسين', firstEn: 'Husayn', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g5-9', gen: 5, fatherId: 'g4-6', nameAr: 'خليل', nameEn: 'Khalil', firstAr: 'خليل', firstEn: 'Khalil', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },

  { id: 'g6-1', gen: 6, fatherId: 'g5-1', nameAr: 'ابراهيم', nameEn: 'Ibrahim', firstAr: 'ابراهيم', firstEn: 'Ibrahim', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g6-2', gen: 6, fatherId: 'g5-1', nameAr: 'شعيب', nameEn: 'Shuayb', firstAr: 'شعيب', firstEn: 'Shuayb', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g6-3', gen: 6, fatherId: 'g5-2', nameAr: 'جلال', nameEn: 'Jalal', firstAr: 'جلال', firstEn: 'Jalal', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g6-4', gen: 6, fatherId: 'g5-3', nameAr: 'محمد', nameEn: 'Muhammad', firstAr: 'محمد', firstEn: 'Muhammad', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g6-5', gen: 6, fatherId: 'g5-4', nameAr: 'فتحي', nameEn: 'Fathi', firstAr: 'فتحي', firstEn: 'Fathi', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g6-6', gen: 6, fatherId: 'g5-4', nameAr: 'يوسف', nameEn: 'Yusuf', firstAr: 'يوسف', firstEn: 'Yusuf', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g6-7', gen: 6, fatherId: 'g5-4', nameAr: 'محمود', nameEn: 'Mahmoud', firstAr: 'محمود', firstEn: 'Mahmoud', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g6-8', gen: 6, fatherId: 'g5-6', nameAr: 'محمد', nameEn: 'Muhammad', firstAr: 'محمد', firstEn: 'Muhammad', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g6-9', gen: 6, fatherId: 'g5-6', nameAr: 'مصطفى', nameEn: 'Mustafa', firstAr: 'مصطفى', firstEn: 'Mustafa', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g6-10', gen: 6, fatherId: 'g5-6', nameAr: 'ضرار', nameEn: 'Dirar', firstAr: 'ضرار', firstEn: 'Dirar', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g6-11', gen: 6, fatherId: 'g5-7', nameAr: 'معروف', nameEn: 'Maruf', firstAr: 'معروف', firstEn: 'Maruf', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g6-12', gen: 6, fatherId: 'g5-8', nameAr: 'حسن', nameEn: 'Hasan', firstAr: 'حسن', firstEn: 'Hasan', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g6-13', gen: 6, fatherId: 'g5-9', nameAr: 'شكري', nameEn: 'Shukri', firstAr: 'شكري', firstEn: 'Shukri', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g6-14', gen: 6, fatherId: 'g5-9', nameAr: 'عبداللطيف', nameEn: 'Abd al-Latif', firstAr: 'عبداللطيف', firstEn: 'Abd al-Latif', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },

  { id: 'g7-1', gen: 7, fatherId: 'g6-1', nameAr: 'عارف', nameEn: 'Arif', firstAr: 'عارف', firstEn: 'Arif', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g7-2', gen: 7, fatherId: 'g6-1', nameAr: 'محمد', nameEn: 'Muhammad', firstAr: 'محمد', firstEn: 'Muhammad', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g7-3', gen: 7, fatherId: 'g6-2', nameAr: 'شعبان', nameEn: 'Shaban', firstAr: 'شعبان', firstEn: 'Shaban', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g7-4', gen: 7, fatherId: 'g6-2', nameAr: 'زهير', nameEn: 'Zuhayr', firstAr: 'زهير', firstEn: 'Zuhayr', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g7-5', gen: 7, fatherId: 'g6-2', nameAr: 'زاهي', nameEn: 'Zahi', firstAr: 'زاهي', firstEn: 'Zahi', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g7-6', gen: 7, fatherId: 'g6-3', nameAr: 'أحمد', nameEn: 'Ahmad', firstAr: 'أحمد', firstEn: 'Ahmad', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g7-7', gen: 7, fatherId: 'g6-4', nameAr: 'أحمد', nameEn: 'Ahmad', firstAr: 'أحمد', firstEn: 'Ahmad', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g7-8', gen: 7, fatherId: 'g6-5', nameAr: 'ناظم', nameEn: 'Nazim', firstAr: 'ناظم', firstEn: 'Nazim', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g7-9', gen: 7, fatherId: 'g6-5', nameAr: 'باسم', nameEn: 'Basim', firstAr: 'باسم', firstEn: 'Basim', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g7-10', gen: 7, fatherId: 'g6-5', nameAr: 'حازم', nameEn: 'Hazim', firstAr: 'حازم', firstEn: 'Hazim', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g7-11', gen: 7, fatherId: 'g6-5', nameAr: 'مطر', nameEn: 'Matar', firstAr: 'مطر', firstEn: 'Matar', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g7-12', gen: 7, fatherId: 'g6-5', nameAr: 'حاتم', nameEn: 'Hatim', firstAr: 'حاتم', firstEn: 'Hatim', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g7-13', gen: 7, fatherId: 'g6-6', nameAr: 'ثائر', nameEn: 'Thaer', firstAr: 'ثائر', firstEn: 'Thaer', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g7-14', gen: 7, fatherId: 'g6-6', nameAr: 'أشرف', nameEn: 'Ashraf', firstAr: 'أشرف', firstEn: 'Ashraf', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g7-15', gen: 7, fatherId: 'g6-7', nameAr: 'نشأت', nameEn: 'Nashat', firstAr: 'نشأت', firstEn: 'Nashat', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g7-16', gen: 7, fatherId: 'g6-7', nameAr: 'نهاد', nameEn: 'Nihad', firstAr: 'نهاد', firstEn: 'Nihad', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g7-17', gen: 7, fatherId: 'g6-7', nameAr: 'جهاد', nameEn: 'Jihad', firstAr: 'جهاد', firstEn: 'Jihad', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g7-18', gen: 7, fatherId: 'g6-8', nameAr: 'هيثم', nameEn: 'Haytham', firstAr: 'هيثم', firstEn: 'Haytham', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g7-19', gen: 7, fatherId: 'g6-10', nameAr: 'علاء', nameEn: 'Alaa', firstAr: 'علاء', firstEn: 'Alaa', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g7-20', gen: 7, fatherId: 'g6-10', nameAr: 'بهاء', nameEn: 'Baha', firstAr: 'بهاء', firstEn: 'Baha', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g7-21', gen: 7, fatherId: 'g6-10', nameAr: 'نزار', nameEn: 'Nizar', firstAr: 'نزار', firstEn: 'Nizar', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g7-22', gen: 7, fatherId: 'g6-11', nameAr: 'صندري', nameEn: 'Sundari', firstAr: 'صندري', firstEn: 'Sundari', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g7-23', gen: 7, fatherId: 'g6-12', nameAr: 'علي', nameEn: 'Ali', firstAr: 'علي', firstEn: 'Ali', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g7-24', gen: 7, fatherId: 'g6-13', nameAr: 'خليل', nameEn: 'Khalil', firstAr: 'خليل', firstEn: 'Khalil', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g7-25', gen: 7, fatherId: 'g6-14', nameAr: 'لطفي', nameEn: 'Lutfi', firstAr: 'لطفي', firstEn: 'Lutfi', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },

  { id: 'g8-1', gen: 8, fatherId: 'g7-1', nameAr: 'لؤي', nameEn: 'Luay', firstAr: 'لؤي', firstEn: 'Luay', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g8-2', gen: 8, fatherId: 'g7-2', nameAr: 'لؤي', nameEn: 'Luay', firstAr: 'لؤي', firstEn: 'Luay', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g8-3', gen: 8, fatherId: 'g7-3', nameAr: 'محمد', nameEn: 'Muhammad', firstAr: 'محمد', firstEn: 'Muhammad', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g8-4', gen: 8, fatherId: 'g7-5', nameAr: 'سعيد', nameEn: 'Said', firstAr: 'سعيد', firstEn: 'Said', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g8-5', gen: 8, fatherId: 'g7-6', nameAr: 'مصطفى', nameEn: 'Mustafa', firstAr: 'مصطفى', firstEn: 'Mustafa', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g8-6', gen: 8, fatherId: 'g7-7', nameAr: 'خلف', nameEn: 'Khalaf', firstAr: 'خلف', firstEn: 'Khalaf', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g8-7', gen: 8, fatherId: 'g7-8', nameAr: 'محمد', nameEn: 'Muhammad', firstAr: 'محمد', firstEn: 'Muhammad', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g8-8', gen: 8, fatherId: 'g7-8', nameAr: 'عطاالله', nameEn: 'Ata Allah', firstAr: 'عطاالله', firstEn: 'Ata Allah', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g8-9', gen: 8, fatherId: 'g7-8', nameAr: 'أنس', nameEn: 'Anas', firstAr: 'أنس', firstEn: 'Anas', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g8-10', gen: 8, fatherId: 'g7-9', nameAr: 'بسام', nameEn: 'Bassam', firstAr: 'بسام', firstEn: 'Bassam', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g8-11', gen: 8, fatherId: 'g7-9', nameAr: 'خالد', nameEn: 'Khalid', firstAr: 'خالد', firstEn: 'Khalid', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g8-12', gen: 8, fatherId: 'g7-9', nameAr: 'نصرالله', nameEn: 'Nasr Allah', firstAr: 'نصرالله', firstEn: 'Nasr Allah', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g8-13', gen: 8, fatherId: 'g7-9', nameAr: 'حمدالله', nameEn: 'Hamd Allah', firstAr: 'حمدالله', firstEn: 'Hamd Allah', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g8-14', gen: 8, fatherId: 'g7-10', nameAr: 'مجد', nameEn: 'Majd', firstAr: 'مجد', firstEn: 'Majd', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g8-15', gen: 8, fatherId: 'g7-10', nameAr: 'آدم', nameEn: 'Adam', firstAr: 'آدم', firstEn: 'Adam', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g8-16', gen: 8, fatherId: 'g7-11', nameAr: 'لؤي', nameEn: 'Luay', firstAr: 'لؤي', firstEn: 'Luay', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g8-17', gen: 8, fatherId: 'g7-11', nameAr: 'محمد', nameEn: 'Muhammad', firstAr: 'محمد', firstEn: 'Muhammad', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g8-18', gen: 8, fatherId: 'g7-12', nameAr: 'أحمد', nameEn: 'Ahmad', firstAr: 'أحمد', firstEn: 'Ahmad', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g8-19', gen: 8, fatherId: 'g7-12', nameAr: 'قيس', nameEn: 'Qays', firstAr: 'قيس', firstEn: 'Qays', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g8-20', gen: 8, fatherId: 'g7-13', nameAr: 'مجدي', nameEn: 'Majdi', firstAr: 'مجدي', firstEn: 'Majdi', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g8-21', gen: 8, fatherId: 'g7-13', nameAr: 'يوسف', nameEn: 'Yusuf', firstAr: 'يوسف', firstEn: 'Yusuf', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g8-22', gen: 8, fatherId: 'g7-13', nameAr: 'مصطفى', nameEn: 'Mustafa', firstAr: 'مصطفى', firstEn: 'Mustafa', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g8-23', gen: 8, fatherId: 'g7-14', nameAr: 'ليث', nameEn: 'Layth', firstAr: 'ليث', firstEn: 'Layth', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g8-24', gen: 8, fatherId: 'g7-14', nameAr: 'أسامة', nameEn: 'Usama', firstAr: 'أسامة', firstEn: 'Usama', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g8-25', gen: 8, fatherId: 'g7-14', nameAr: 'محمد', nameEn: 'Muhammad', firstAr: 'محمد', firstEn: 'Muhammad', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g8-26', gen: 8, fatherId: 'g7-14', nameAr: 'كريم', nameEn: 'Karim', firstAr: 'كريم', firstEn: 'Karim', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g8-27', gen: 8, fatherId: 'g7-15', nameAr: 'طارق', nameEn: 'Tariq', firstAr: 'طارق', firstEn: 'Tariq', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g8-28', gen: 8, fatherId: 'g7-15', nameAr: 'محمود', nameEn: 'Mahmoud', firstAr: 'محمود', firstEn: 'Mahmoud', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g8-29', gen: 8, fatherId: 'g7-15', nameAr: 'يوسف', nameEn: 'Yusuf', firstAr: 'يوسف', firstEn: 'Yusuf', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g8-30', gen: 8, fatherId: 'g7-15', nameAr: 'أحمد', nameEn: 'Ahmad', firstAr: 'أحمد', firstEn: 'Ahmad', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g8-31', gen: 8, fatherId: 'g7-16', nameAr: 'يزن', nameEn: 'Yazan', firstAr: 'يزن', firstEn: 'Yazan', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g8-32', gen: 8, fatherId: 'g7-16', nameAr: 'مروان', nameEn: 'Marwan', firstAr: 'مروان', firstEn: 'Marwan', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g8-33', gen: 8, fatherId: 'g7-17', nameAr: 'عمار', nameEn: 'Ammar', firstAr: 'عمار', firstEn: 'Ammar', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g8-34', gen: 8, fatherId: 'g7-17', nameAr: 'بشار', nameEn: 'Bashar', firstAr: 'بشار', firstEn: 'Bashar', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g8-35', gen: 8, fatherId: 'g7-17', nameAr: 'محمد', nameEn: 'Muhammad', firstAr: 'محمد', firstEn: 'Muhammad', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g8-36', gen: 8, fatherId: 'g7-18', nameAr: 'أسامة', nameEn: 'Usama', firstAr: 'أسامة', firstEn: 'Usama', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g8-37', gen: 8, fatherId: 'g7-18', nameAr: 'محمد', nameEn: 'Muhammad', firstAr: 'محمد', firstEn: 'Muhammad', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g8-38', gen: 8, fatherId: 'g7-19', nameAr: 'آدم', nameEn: 'Adam', firstAr: 'آدم', firstEn: 'Adam', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g8-39', gen: 8, fatherId: 'g7-20', nameAr: 'وليد', nameEn: 'Walid', firstAr: 'وليد', firstEn: 'Walid', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g8-40', gen: 8, fatherId: 'g7-20', nameAr: 'عبدالرحمن', nameEn: 'Abd al-Rahman', firstAr: 'عبدالرحمن', firstEn: 'Abd al-Rahman', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g8-41', gen: 8, fatherId: 'g7-20', nameAr: 'مصطفى', nameEn: 'Mustafa', firstAr: 'مصطفى', firstEn: 'Mustafa', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g8-42', gen: 8, fatherId: 'g7-22', nameAr: 'سميح', nameEn: 'Samih', firstAr: 'سميح', firstEn: 'Samih', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g8-43', gen: 8, fatherId: 'g7-23', nameAr: 'بدر', nameEn: 'Badr', firstAr: 'بدر', firstEn: 'Badr', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g8-44', gen: 8, fatherId: 'g7-24', nameAr: 'فرح', nameEn: 'Farah', firstAr: 'فرح', firstEn: 'Farah', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g8-45', gen: 8, fatherId: 'g7-25', nameAr: 'علي', nameEn: 'Ali', firstAr: 'علي', firstEn: 'Ali', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },

  { id: 'g9-1', gen: 9, fatherId: 'g8-1', nameAr: 'ادريس', nameEn: 'Idris', firstAr: 'ادريس', firstEn: 'Idris', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: '', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g9-2', gen: 9, fatherId: 'g8-2', nameAr: 'نايف', nameEn: 'Nayif', firstAr: 'نايف', firstEn: 'Nayif', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g9-3', gen: 9, fatherId: 'g8-3', nameAr: 'عدنان', nameEn: 'Adnan', firstAr: 'عدنان', firstEn: 'Adnan', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g9-4', gen: 9, fatherId: 'g8-3', nameAr: 'ابراهيم', nameEn: 'Ibrahim', firstAr: 'ابراهيم', firstEn: 'Ibrahim', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g9-5', gen: 9, fatherId: 'g8-4', nameAr: 'عبدالرحمن', nameEn: 'Abd al-Rahman', firstAr: 'عبدالرحمن', firstEn: 'Abd al-Rahman', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g9-6', gen: 9, fatherId: 'g8-5', nameAr: 'رياض', nameEn: 'Riyad', firstAr: 'رياض', firstEn: 'Riyad', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g9-7', gen: 9, fatherId: 'g8-6', nameAr: 'محمود', nameEn: 'Mahmoud', firstAr: 'محمود', firstEn: 'Mahmoud', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g9-8', gen: 9, fatherId: 'g8-11', nameAr: 'أحمد', nameEn: 'Ahmad', firstAr: 'أحمد', firstEn: 'Ahmad', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g9-9', gen: 9, fatherId: 'g8-11', nameAr: 'يوسف', nameEn: 'Yusuf', firstAr: 'يوسف', firstEn: 'Yusuf', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g9-10', gen: 9, fatherId: 'g8-20', nameAr: 'براء', nameEn: 'Baraa', firstAr: 'براء', firstEn: 'Baraa', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g9-11', gen: 9, fatherId: 'g8-20', nameAr: 'عمر', nameEn: 'Umar', firstAr: 'عمر', firstEn: 'Umar', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g9-12', gen: 9, fatherId: 'g8-23', nameAr: 'أشرف', nameEn: 'Ashraf', firstAr: 'أشرف', firstEn: 'Ashraf', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g9-13', gen: 9, fatherId: 'g8-42', nameAr: 'سمير', nameEn: 'Samir', firstAr: 'سمير', firstEn: 'Samir', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g9-14', gen: 9, fatherId: 'g8-43', nameAr: 'ربحي', nameEn: 'Ribhi', firstAr: 'ربحي', firstEn: 'Ribhi', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g9-15', gen: 9, fatherId: 'g8-44', nameAr: 'فرحات', nameEn: 'Farhat', firstAr: 'فرحات', firstEn: 'Farhat', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g9-16', gen: 9, fatherId: 'g8-45', nameAr: 'داوود', nameEn: 'Dawud', firstAr: 'داوود', firstEn: 'Dawud', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },

  { id: 'g10-1', gen: 10, fatherId: 'g9-2', nameAr: 'سامي', nameEn: 'Sami', firstAr: 'سامي', firstEn: 'Sami', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: '', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g10-2', gen: 10, fatherId: 'g9-3', nameAr: 'سمير', nameEn: 'Samir', firstAr: 'سمير', firstEn: 'Samir', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g10-3', gen: 10, fatherId: 'g9-4', nameAr: 'نطاطا', nameEn: 'Natata', firstAr: 'نطاطا', firstEn: 'Natata', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g10-4', gen: 10, fatherId: 'g9-5', nameAr: 'رجب', nameEn: 'Rajab', firstAr: 'رجب', firstEn: 'Rajab', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g10-5', gen: 10, fatherId: 'g9-6', nameAr: 'جمال', nameEn: 'Jamal', firstAr: 'جمال', firstEn: 'Jamal', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g10-6', gen: 10, fatherId: 'g9-7', nameAr: 'عبدالحميد', nameEn: 'Abd al-Hamid', firstAr: 'عبدالحميد', firstEn: 'Abd al-Hamid', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g10-7', gen: 10, fatherId: 'g9-13', nameAr: 'ثابت', nameEn: 'Thabit', firstAr: 'ثابت', firstEn: 'Thabit', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g10-8', gen: 10, fatherId: 'g9-14', nameAr: 'عمر', nameEn: 'Umar', firstAr: 'عمر', firstEn: 'Umar', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g10-9', gen: 10, fatherId: 'g9-16', nameAr: 'جودات', nameEn: 'Jawdat', firstAr: 'جودات', firstEn: 'Jawdat', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },

  { id: 'g11-1', gen: 11, fatherId: 'g10-2', nameAr: 'محمد', nameEn: 'Muhammad', firstAr: 'محمد', firstEn: 'Muhammad', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g11-2', gen: 11, fatherId: 'g10-4', nameAr: 'محمد', nameEn: 'Muhammad', firstAr: 'محمد', firstEn: 'Muhammad', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g11-3', gen: 11, fatherId: 'g10-5', nameAr: 'شوقي', nameEn: 'Shawqi', firstAr: 'شوقي', firstEn: 'Shawqi', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g11-4', gen: 11, fatherId: 'g10-6', nameAr: 'يوسف', nameEn: 'Yusuf', firstAr: 'يوسف', firstEn: 'Yusuf', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g11-5', gen: 11, fatherId: 'g10-7', nameAr: 'مدحت', nameEn: 'Mudhat', firstAr: 'مدحت', firstEn: 'Mudhat', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g11-6', gen: 11, fatherId: 'g10-8', nameAr: 'نائل', nameEn: 'Nail', firstAr: 'نائل', firstEn: 'Nail', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g11-7', gen: 11, fatherId: 'g10-9', nameAr: 'جودة', nameEn: 'Jawda', firstAr: 'جودة', firstEn: 'Jawda', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },

  { id: 'g12-1', gen: 12, fatherId: 'g11-3', nameAr: 'عمر', nameEn: 'Umar', firstAr: 'عمر', firstEn: 'Umar', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g12-2', gen: 12, fatherId: 'g11-4', nameAr: 'منذر', nameEn: 'Mundhir', firstAr: 'منذر', firstEn: 'Mundhir', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
  { id: 'g12-3', gen: 12, fatherId: 'g11-7', nameAr: 'سميح', nameEn: 'Samih', firstAr: 'سميح', firstEn: 'Samih', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },

  { id: 'g13-1', gen: 13, fatherId: 'g12-1', nameAr: 'خالد', nameEn: 'Khalid', firstAr: 'خالد', firstEn: 'Khalid', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },

  { id: 'g14-1', gen: 14, fatherId: 'g13-1', nameAr: 'عبدالله', nameEn: 'Abdullah', firstAr: 'عبدالله', firstEn: 'Abdullah', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },

  { id: 'g15-1', gen: 15, fatherId: 'g14-1', nameAr: 'يوسف', nameEn: 'Yusuf', firstAr: 'يوسف', firstEn: 'Yusuf', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: 'رحمه الله', bioAr: '', bioEn: '', sourcesEn: [], verified: false },

  { id: 'g16-1', gen: 16, fatherId: 'g15-1', nameAr: 'بنيامين', nameEn: 'Binyamin', firstAr: 'بنيامين', firstEn: 'Binyamin', born: null, bornCirca: false, died: null, diedCirca: false, placeAr: '', placeEn: '', honorific: '', bioAr: '', bioEn: '', sourcesEn: [], verified: false },
]

const people: Person[] = raw.map(p => ({
  ...p,
  monogramAr: p.firstAr[0],
  monogramEn: p.firstEn[0],
}))

const byId: Record<string, Person> = Object.fromEntries(people.map(p => [p.id, p]))

const childrenOf: Record<string, string[]> = Object.fromEntries(people.map(p => [p.id, [] as string[]]))
people.forEach(p => { if (p.fatherId) childrenOf[p.fatherId].push(p.id) })

const byGen: Record<number, Person[]> = {}
people.forEach(p => { (byGen[p.gen] ??= []).push(p) })
const generations = Object.keys(byGen).map(Number).sort((a, b) => a - b)

function ancestors(id: string): string[] {
  const out: string[] = []
  let cur: Person | undefined = byId[id]
  while (cur) { out.push(cur.id); cur = cur.fatherId ? byId[cur.fatherId] : undefined }
  return out
}

function relationship(aId: string, bId: string): RelResult | null {
  if (!byId[aId] || !byId[bId]) return null
  const aAnc = ancestors(aId)
  const bAnc = ancestors(bId)
  const bSet = new Set(bAnc)
  let lca: string | null = null
  for (const x of aAnc) { if (bSet.has(x)) { lca = x; break } }
  if (!lca) return null
  const aPath = aAnc.slice(0, aAnc.indexOf(lca) + 1)
  const bPath = bAnc.slice(0, bAnc.indexOf(lca) + 1)
  return { lca, aPath, bPath, aSteps: aPath.length - 1, bSteps: bPath.length - 1 }
}

function descendantCount(id: string): number {
  let n = 1
  for (const c of childrenOf[id]) n += descendantCount(c)
  return n
}

function topBranches(atGen = 1) {
  return (byGen[atGen] ?? [])
    .map(p => ({ p, count: descendantCount(p.id) }))
    .sort((a, b) => b.count - a.count)
}

function stats(): Stats {
  const total = people.length
  const generationCount = generations.length
  const perGen = generations.map(g => ({ gen: g, count: byGen[g].length }))
  const fathers = people.filter(p => childrenOf[p.id].length > 0)
  const avgChildren = fathers.length
    ? fathers.reduce((s, p) => s + childrenOf[p.id].length, 0) / fathers.length
    : 0
  const verified = people.filter(p => p.verified).length
  const births = people.map(p => p.born).filter((b): b is number => b !== null)
  return {
    total, generationCount, perGen, avgChildren,
    fathersCount: fathers.length, verified,
    earliestBorn: births.length ? Math.min(...births) : null,
    latestBorn: births.length ? Math.max(...births) : null,
  }
}

export const data: KarajahData = {
  people, byId, byGen, generations, childrenOf,
  ancestors, relationship, descendantCount, topBranches, stats,
  root: people.find(p => p.fatherId === null)!,
}
