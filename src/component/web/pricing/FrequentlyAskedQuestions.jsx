import React from "react";

const FrequentlyAskedQuestions = () => {
  const frequentQuestionsLeft = [
    {
      question: "How often is the data updated?",
      answer:
        "The intelligence database is refreshed automatically every two weeks. Our quality assurance team also manually resolves inaccuracies that are reported within 24 hours.",
    },
    {
      question: "Which ecommerce technology platforms are supported?",
      answer:
        "Retail Scout currently supports all active retail stores built with Shopify, WooCommerce, Wix, Magento, Squarespace, BigCommerce, and PrestaShop. In 2021, we expect to add retail stores from more platforms, including Square Online, Big Cartel, and Salesforce Commerce.",
    },
    {
      question: "How can I schedule a demo for my team?",
      answer:
        "We would be delighted to do a call with your team to demonstrate our product. Please contact us to coordinate a demo.",
    },
    {
      question: "How can I request new features?",
      answer:
        "We love to hear from our customers! If you have any ideas on how we can make your work easier, please let us know by contacting us.",
    },
  ];
  const frequentQuestionsRight = [
    {
      question: "How is this data generated?",
      answer:
        "Retail Scout combines multiple data streams to create the best-in-class online retail intelligence database. One of our data streams comes from an automated crawler that visits millions of websites of retail stores on a regular basis. For each website, we use Natural Language Processing (NLP) technology to extract products and store attributes. We refine our extractions with automated quality checks and a manual quality assurance team.",
    },
    {
      question: "How are StoreRank and GrowthRank calculated?",
      answer:
        "StoreRank is our proprietary rank of store popularity. We calculate this by combining many metrics such as Alexa Rank, Pagerank, Harmonic Centrality, and Social Media follower and engagement statistics.",
      answer2:
        "GrowthRank is our proprietary rank of the store’s growth that is based on 30-day follower and engagement growth on Instagram, Pinterest, Facebook, Tiktok, Twitter, and Youtube.",
    },
    {
      question: "How many active stores are available?",
      answer:
        "We have over 3,000,000 active online stores, and add tens of thousands of new stores every month.",
    },
  ];

  return (
    <div className={`container-wrapper items-center pb-10 md:pb-32`}>
      <div className="heading-2 text-left md:text-center text-secondary pb-6 md:pb-12">
        Frequently Asked Question
      </div>
      <div className="flex w-full gap-4 md:gap-6">
        <div className="w-full md:w-1/2">
          <div className="grid grid-flow-row gap-4 md:gap-6">
            {frequentQuestionsLeft.map((frequentQues, index) => {
              return (
                <div
                  className="p-4 rounded"
                  key={index}
                  style={{ background: "rgba(11, 28, 40, 0.08)" }}
                >
                  <div className="heading-5 text-secondary mb-4">
                    {frequentQues.question}
                  </div>
                  <div className="paragraph-body text-text">
                    {frequentQues.answer}
                  </div>
                  {frequentQues.answer2 && (
                    <div className="paragraph-body text-text">
                      {frequentQues.answer2}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <div className="grid grid-flow-row  gap-4 md:gap-6">
            {frequentQuestionsRight.map((frequentQues, index) => {
              return (
                <div
                  className="p-4 rounded"
                  key={index}
                  style={{ background: "rgba(11, 28, 40, 0.08)" }}
                >
                  <div className="heading-5 text-secondary mb-4">
                    {frequentQues.question}
                  </div>
                  <div className="paragraph-body text-text">
                    {frequentQues.answer}
                  </div>
                  {frequentQues.answer2 && (
                    <div className="paragraph-body text-text">
                      {frequentQues.answer2}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrequentlyAskedQuestions;
