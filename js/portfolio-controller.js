'user-strict';

$(function() {
    _createProjects();
});

function _createProjects() {
    var projectsStr = getProjs().reduce(function(acc, proj){
        var elPortfolioItem = $('.portfolio-item')[0].outerHTML;
        var screenshot = `projects/${proj.id}/images/screenshot.png`;
        return acc + elPortfolioItem.format(proj.id, screenshot, proj.name, proj.title);
    }, '');
    $('.portfolios').html(projectsStr);
}

function onShowProjectDetails(projId){
    var proj = getProj(projId);
    var elModal = $("#portfolioModal .modal-body").html();
    var formatted = elModal.format(proj.name, proj.desc, `projects/${proj.id}/images/screenshot.png`);
    $("#portfolioModal .modal-body").html(formatted);
}

function onSendMail(){
    var email = $("#contact #inputEmail").val();
    var subject = $("#contact #inputSubject").val();
    var message = $("#contact #textareaMessage").val();
    var sendUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=anicka.lerner@gmail.com&su=${subject}&body=${message} from ${email}`;
    window.open(sendUrl);
}