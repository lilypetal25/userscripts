// ==UserScript==
// @name         Fix shifts table in Humanity
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       Lily Haverstein
// @description  Applies some simple styles to the table of shifts in humanity so it is slightly less awful.
// @match        https://thetrevorproject.humanity.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=humanity.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    if (typeof $ !== 'function') {
        console.log('JQuery is not unavailable.');
        return;
    }

    $(document).ready(function() {
        const rightPanes = $('#_cd_dashboard .right, #_cd_requests .right');

        if (rightPanes.length == 0) {
            console.log('Right pane isn\'t present.');
            return;
        }
    
        const observer = new MutationObserver(onMutationsObserved);

        rightPanes.each(function(i, rightPane) {
            console.log('Registering observer for right pane');
            observer.observe(rightPane, { childList: true });
        });

        console.log('Lily is watching.');
    });

    function onMutationsObserved(mutations) {
        console.log("Lily sees your mutations.", mutations);

        mutations.forEach(mutation => {
            if (mutation && mutation.addedNodes && $(mutation.addedNodes).first('table.ResultsTable').length > 0) {
                modifyShiftsTable();
            }
        });
    }

    function modifyShiftsTable() {
        console.log('Lily is fixing your awful table.');

        let rows = $('table.ResultsTable tr:not(".title")');
        let unavailableRows = rows.has('td a.TradeButton + div + small');
        let highNeedRows = rows.has('td i:contains("*HIGH NEED*")');

        rows.css('color', 'black');
        highNeedRows.find('td').css('color', 'green');
        highNeedRows.find('td').css('text-decoration', 'underline');
        unavailableRows.find('td').css('color', 'gray');
        unavailableRows.find('td').css('text-decoration', 'line-through')
    }
})();