// src-bex/my-content-script.js

// Hooks added here have a bridge allowing communication between the BEX Content Script and the Quasar Application.
// More info: https://quasar.dev/quasar-cli/developing-browser-extensions/content-hooks
import { bexContent } from 'quasar/wrappers'
import {
  SEARCH_INPUT_CLASS,
} from './constants';

const
  searchInputs = document.createElement('div'),
  searchFrame = document.createElement('iframe'),
  minimizeButton = document.createElement('button'),
  searchInputOriginal = document.getElementsByClassName(SEARCH_INPUT_CLASS)[0];


/**
 * The code below will get everything going. Initialize the iFrame with defaults and add it to the page.
 * @type {string}
 */
searchInputs.id = 'bex-search'
searchInputs.style['height'] = '200px';
searchInputs.classList.add(SEARCH_INPUT_CLASS);
searchInputs.classList.add('maximized');
searchFrame.width = '100%';

minimizeButton.onclick = () => {
  searchInputs.style['height'] = '50px';
  searchInputs.classList.remove('maximized');
  searchInputs.classList.add('minimized');
}

(function () {
  if (window.location.href.includes('google')) {
    searchFrame.src = chrome.runtime.getURL('www/index.html') + '#/search';
    searchInputs.appendChild(searchFrame);
    try {
      searchInputOriginal?.parentNode?.insertBefore(searchInputs, searchInputOriginal.nextSibling)
    } catch (error) {
      console.log('Error creating component'); 
    }
  //   document.body.prepend(iFrame)
  }
})()

export default bexContent;