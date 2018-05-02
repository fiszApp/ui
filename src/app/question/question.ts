export interface Question {

  id?: number;

  question?: string;

  answer?: string;

  category?: CategoryView;

}

export interface CategoryView {

  id?: number;

  name?: string;

  userId?: number;

  description?: string;

}

export interface CreateQuestion {

  question?: string;

  answer?: string;

  categoryId?: number;

}

export interface EditQuestion {

  question?: string;

  answer?: string;

  categoryId?: number;

}
