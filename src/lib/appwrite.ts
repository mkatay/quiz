import { Client, Databases, Storage } from "appwrite";
import { AW_DATABASE, AW_ENDPOINT, AW_PROJECT, AW_QUESTIONS_TABLE, AW_TESTS_TABLE } from "./config";

export const client = new Client();

client.setProject(AW_PROJECT);
client.setEndpoint(AW_ENDPOINT);

export const storage = new Storage(client);

export const databases =  new Databases(client);
export enum DB {
  ID = AW_DATABASE,
  TESTS = AW_TESTS_TABLE,
  QUESTIONS = AW_QUESTIONS_TABLE,
};

interface DefaultDocumentParams {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: unknown[];
  $databaseId: string;
  $collectionId: string;
};

export interface DBTest extends DefaultDocumentParams {
  profession: string;
  profession_id: number;
  year: number;
  month: number;
};

export enum QuestionType {
  ORDER = 'order',
  MATCH = 'match',
  SINGLE_CHOICE = 'single_choice',
  MULTIPLE_CHOICE = 'multiple_choice',
}

export interface DBQuestion extends DefaultDocumentParams {
  question: string;
  type: QuestionType;
  options: string[];
  matches: string[];
  test: DBTest;
  image: string;
};