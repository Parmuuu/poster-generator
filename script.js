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

                const circleX = 305;
                const circleY = 805;
                const circleRadius = 260;

                ctx.arc(
                    circleX,
                    circleY,
                    circleRadius,
                    0,
                    Math.PI * 2
                );

                ctx.closePath();
                ctx.clip();

                // COVER MODE

                const circleDiameter = circleRadius * 2;

                const scale = Math.max(
                    circleDiameter / userImg.width,
                    circleDiameter / userImg.height
                );

                const imgWidth = userImg.width * scale;
                const imgHeight = userImg.height * scale;

                const imgX = circleX - (imgWidth / 2);
                const imgY = circleY - (imgHeight / 2);

                ctx.drawImage(
                    userImg,
                    imgX,
                    imgY,
                    imgWidth,
                    imgHeight
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

    poster.src = "poster.png?v=" + Date.now();
}

function downloadPoster() {

    const canvas = document.getElementById("canvas");

    const image = canvas.toDataURL("image/png");

    const newTab = window.open();

    newTab.document.write(
        '<img src="' + image + '" style="width:100%">'
    );
}
