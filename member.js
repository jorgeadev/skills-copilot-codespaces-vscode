function skillsMember() {
    var data = {
        name: "John Doe",
        skills: ["html", "css", "javascript", "php", "mysql", "c++", "python", "c#"]
    };
    var member = new Member(data);
    member.skills.forEach(function (skill) {
        console.log(skill);
    });
}