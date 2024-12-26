import { useEffect } from "react";

// Define the types for the props
const useFlashTitle = (title: string, interval: number = 5000): null => {
  useEffect(() => {
    let id: number;
    let previousTitle: string = document.title;

    const changeTitle = () => {
      if (document.title !== title) {
        previousTitle = document.title;
        document.title = title;
      } else {
        document.title = previousTitle;
      }
      id = window.setTimeout(changeTitle, interval);
    };

    changeTitle();

    return () => {
      if (document.title === title) {
        document.title = previousTitle;
      }
      if (id) {
        window.clearTimeout(id);
      }
    };
  }, [title, interval]);

  return null;
};

export default useFlashTitle;
