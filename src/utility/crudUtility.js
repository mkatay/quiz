//a backend kölünválasztva
import {db} from "./firebaseApp";
import {collection, addDoc,doc,deleteDoc,query,getDoc,
  where,serverTimestamp, updateDoc,orderBy,onSnapshot,
  getDocs} from "firebase/firestore";

//getDocs: Egyszeri lekérdezést hajt végre a megadott gyűjteményen
export const readQuizList = async (setList) => {
  const collectionRef = collection(db, "quiz_list");
  try {
    const querySnapshot = await getDocs(collectionRef);
    const quizList = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    }));
    setList(quizList);
  } catch (error) {
    console.error("Error fetching quiz list: ", error);
  }
};
export const readQuizContent = async (selectedQuiz,setQuiz) => {
  const collectionRef = collection(db, "quiz-content");
  try {
    const querySnapshot = await getDocs(collectionRef,where('year','==',selectedQuiz));
    const quizContent = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    }));
     // Véletlenszerű sorrendezés (shuffle)
    const shuffledQuizContent = quizContent.sort(() => Math.random() - 0.5);
    setQuiz(shuffledQuizContent);
    //setQuiz(quizContent)
  } catch (error) {
    console.error("Error fetching quiz list: ", error);
  }
};



    
// Adatok hozzáadása Firestore-ba egy tömbből amely objektumokat tartalmaz:
export const addMultipleDocuments=async (dataArray) =>{
  const collectionRef = collection(db, 'quiz-content');
  
  dataArray.forEach(async (data) => {
    try {
      const docRef = await addDoc(collectionRef, data);
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  });
}
//használata: kell egy admin komponens majd amelyikben meghívódik:
/*useEffect(()=>{
  addMultipleDocuments(questions)
},[])
*/



export const generateSchema = async (collectionName) => {
  const collectionRef = collection(db, collectionName);
  const snapshot = await getDocs(collectionRef);

  const schema = {};

  snapshot.docs.forEach((doc) => {
    const data = doc.data();
    Object.keys(data).forEach((key) => {
      const value = data[key];
      const type = Array.isArray(value)
        ? "array"
        : value === null
        ? "null"
        : typeof value;
      schema[key] = type; // Egyedi mezőnév és típus tárolása
    });
  });

  console.log("Schema:", schema);
};


