export type Response<T = {}> = {
  resultCode: number;
  messages: string[];
  fieldsErrors: FieldsError[];
  data: T;
};

export type FieldsError = {
  error: string;
  field: string;
};
