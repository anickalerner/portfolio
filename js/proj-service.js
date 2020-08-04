'use strict';

var gProjs = [
    {
        id: 'minesweeper',
        name: 'Minesweeper',
        title: 'A JS version of the good ol\' game',
        desc: 'Go through the minefield without blowing up. Well, ok, you have three live to do it.',
        url: 'projects/minesweeper',
        publishedAt: '22/07/2010',
        labels: ['Matrixes', 'keyboard events']
    },
    {
        id: 'bookshop',
        name: 'Bookshop',
        title: 'Excercise in CRUD',
        desc: 'A project in creating an interface for a bookshop maintanance',
        url: 'projs/bookshop',
        publishedAt: '31/07/2020',
        labels: ['CRUD', 'arrays', 'bootstrap']
    }
];

function getProjs(){
    return gProjs;
}

function getProj(projId){
    return gProjs.filter(function(proj){
        return proj.id === projId;
    })[0];
}