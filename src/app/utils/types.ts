export interface Category {
  _id: string,
  name: string,
  description: string,
  rating: string,
  popularity : string
}

export interface Question {
    _id: string,
    description: string,
    choices: string[],
    correctChoice: string,
    difficulty: string,
    categoryId : string
}
