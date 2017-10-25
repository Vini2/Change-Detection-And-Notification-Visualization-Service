import {Component, OnInit} from '@angular/core';
import * as JsDiff from 'diff'

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  diffType: string = 'char';

  constructor() {
  }

  ngOnInit() {
  }

  selectDiffType(type: string) {
    this.diffType = type;

    this.diffUsingJS();
  }

  diffUsingJS() {
    const one = document.getElementById("baseText")['value'];
    const other = document.getElementById("newText")['value'];
    const display = document.getElementById('diffoutput');
    const fragment = document.createDocumentFragment();

    let color = '';
    let decoration = '';
    let span = null;
    let diff;

    switch (this.diffType) {
      case 'char':
        diff = JsDiff.diffChars(one, other);
        break;
      case 'word':
        diff = JsDiff.diffWords(one, other);
        break;
      case 'line':
        diff = JsDiff.diffLines(one, other);
        break;
      case 'sentence':
        diff = JsDiff.diffSentences(one, other);
        break;
    }

    diff.forEach((part) => {
      // green for additions, red for deletions
      // grey for common parts
      color = part.added ? 'green' :
        part.removed ? 'red' : 'grey';
      decoration = part.removed ? 'line-through' : 'none';

      span = document.createElement('span');
      span.style.color = color;
      span.style.textDecoration = decoration;
      span.appendChild(document
        .createTextNode(part.value));
      fragment.appendChild(span);
    });

    display.innerHTML = '';
    display.appendChild(fragment);
  }

}
