import { createTag } from '../../utils/utils.js';

const retrieveSurvey = fetch('./qualtrics-lite-response-SV_1ZX3YCH1Z8Kjjcq.json');


async function init() {
  retrieveSurvey.then((response) => {
    const surveyApiResponse = response.json();
    surveyApiResponse.then((data) => {
      //console.log(data.result);
      const { flow } = data.result;
      const { blocks } = data.result;
      const { questions } = data.result;
      console.log(flow);
      console.log(blocks);
      console.log(questions);
      const surveyformcontainer = document.getElementById ('surveyform');//document.querySelectorAll('.survey-container');
      for (const flowItems in flow) {
        // console.log(flow[flowItems]);
        let blockid = flow[flowItems].id;
        if (blockid) {
        let blockElems = blocks[blockid].elements;
        //console.log(block);
          for (var elem in blockElems) {
            //create questions in the form first
            //const accordionMedia = createTag('div', { class: 'accordion-media', id: `accordion-media-${id}` });
            var question = questions[blockElems[elem].questionId];
            if (question) {
              let questionElement = createTag('div', { class: 'surveyquestion', id: `${question.questionName}`});
              let questionTextElement = createTag('div', { class: 'surveyquestiontext'}, question.questionText);
              //var doc = new DOMParser().parseFromString(question.questionText.replace(/(\r\n|\n|\r)/gm, ''), 'text/html').body.innerHTML;
              questionElement.append(questionTextElement);
              let inputfield;
              if ( question.questionType.type === 'TE' ) {
                inputfield = createTag('input', {name : question.questionName, type : 'text'});
                questionElement.append(inputfield);
              } else if (question.questionType.type === 'MC') {
                  let qc = question.choices;
                  for (var items in qc) {
                    let text = qc[items].description;
                    inputfield = createTag('input', { name : question.questionName, type : 'radio', value : qc[items].choiceText});
                    let p = createTag('p', null, text);
                    questionElement.append(p);
                    questionElement.append(inputfield);
                  }
              }
              
              //var doc = new DOMParser().parseFromString(question.questionText.replace(/(\r\n|\n|\r)/gm, ''), 'text/html');
              surveyformcontainer.append(questionElement);
            }
          }
        }
      }
    });
  });
}

export default init;
