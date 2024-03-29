export default function DefinisiBakatForm({ detailBakatByDefinisi }) {
  //   console.log(detailBakatByNama);
  const data = detailBakatByDefinisi;
  const capitalizeFirstLetter = (sentence) => {
    return sentence.charAt(0).toUpperCase() + sentence.slice(1);
  };

  const capitalizeSentences = (paragraph) => {
    const sentences = paragraph.split(". ");
    const capitalizedSentences = sentences.map((sentence) => {
      return capitalizeFirstLetter(sentence.trim());
    });
    return capitalizedSentences.join(". ");
  };

  //   console.log(dataDetail1);
  return (
    <>
      {data.map((item, index) => (
        <div key={index} className="text-gray-500">
          <p className="font-bold uppercase text-center mb-3 ">
            bakat {item[3]}
          </p>
          <p className="first-letter:uppercase text-justify mb-2">
            {capitalizeSentences(item[0])}
          </p>
          <p className="first-letter:uppercase text-justify mb-2">
            {capitalizeSentences(item[1])}
          </p>
          <p className="first-letter:uppercase text-justify mb-2">
            {capitalizeSentences(item[2])}
          </p>
        </div>
      ))}
    </>
  );
}
