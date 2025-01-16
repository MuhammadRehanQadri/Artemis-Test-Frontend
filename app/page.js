"use client";
import styles from "./styles.module.scss";
import Block from "./components/Block";
import {useEffect, useState} from "react";
export default function Home() {
  const initialData = [
    {
      title: "Block 1",
      description: "FM Companies",
      type: "groupped",
      icon: "/icons/ico-org.png",
      onClick: () => console.log("Block 1 clicked"),
      selected: false
    },
    {
      title: "Academy",
      type: "groupped",
      icon: "/icons/ico-academy.png",
      onClick: () => console.log("Block 2 clicked"),
      selected: false
    },
    {
      title: "Event Companies",
      description: "Description 3",
      icon: "/icons/ico-event.png",
      type: "groupped",
      onClick: () => console.log("Block 3 clicked"),
      selected: false
    },

    {
      title: "Local Clubs",
      description: "Description 3",
      icon: "/icons/ico-local-club.png",
      type: "single",
      onClick: () => console.log("Block 3 clicked"),
      selected: false
    },

    {
      title: "Community Groups",
      description: "Description 3",
      icon: "/icons/ico-org.png",
      type: "single",
      onClick: () => console.log("Block 3 clicked"),
      selected: false
    },
  ];

  const [data, setData] = useState(initialData);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  useEffect(async () => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3030/api/blocks');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log('resss', result)

        setData(result);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    await fetchData();
  }, []);

  useEffect(() => {
    const anySelected = data.some(block => block.selected);
    setIsSubmitDisabled(!anySelected);
  }, [data]);

  const handleBlockClick = (index) => {
    const _data = data.map((block, i) => {
      if (i === index) {
        return { ...block, selected: !block.selected };
      }
      else if (block.type === "single") { // if clicked on type === single, deselect all other singles
        return { ...block, selected: false };
      }
      return block;
    })
    console.log('data', _data)

    setData(_data);
  };

  const handleSubmit = async () => {
    try {
      console.log('hi')
      console.log('POSTING', JSON.stringify(data))
      const response = await fetch('http://127.0.0.1:3030/api/block', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({blocks: data}),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles.main}>
        {data.map((block, index) => (
          <Block key={index} {...block} onClick={() => handleBlockClick(index)}/>
        ))}
      </div>
      <button className={`${styles.btnMain} ${isSubmitDisabled && styles.disabled}`} disabled={isSubmitDisabled} onClick={handleSubmit}>Submit</button>
    </main>
  );
}
