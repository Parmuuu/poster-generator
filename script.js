function generatePoster() {

    const name = document.getElementById("name").value;
    const file = document.getElementById("photo").files[0];

    if (!file) {
        alert("Please upload a photo");
        return;
    }

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    const poster = new Image();

    poster.onload = function () {

        canvas.width = poster.width;
        canvas.height = poster.height;

        ctx.drawImage(poster, 0, 0);

        const reader = new FileReader();

        reader.onload = function (e) {

            const userImg = new Image();

            userImg.onload = function () {

                ctx.save();

                ctx.beginPath();

                ctx.arc(
                    220,
                    790,
                    260,
                    0,
                    Math.PI * 2
                );

                ctx.closePath();
                ctx.clip();

                // EXTRA LARGE PHOTO
                ctx.drawImage(
                    userImg,
                    -80,
                    430,
                    780,
                    780
                );

                ctx.restore();

                let fontSize = 42;

                if (name.length > 20) {
                    fontSize = 32;
                }

                if (name.length > 30) {
                    fontSize = 26;
                }

                ctx.fillStyle = "#7c2d6a";
                ctx.textAlign = "center";
                ctx.font = `italic bold ${fontSize}px Georgia`;

                ctx.fillText(
                    name,
                    canvas.width / 2,
                    poster.height - 130
                );

            };

            userImg.src = e.target.result;

        };

        reader.readAsDataURL(file);

    };

    poster.src = "poster.png";
}
