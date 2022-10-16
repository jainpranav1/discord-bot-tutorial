const fetch = require('node-fetch');
require("dotenv").config();

// gets uuid from voice and text
async function get_uuid_vt(voice, text) {
    const url = "https://api.uberduck.ai/speak";
    const options = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "uberduck-id": "anonymous",
            "Content-Type": "application/json",
            Authorization: `${process.env.AUTHORIZATION}`,
        },
        body: JSON.stringify({ voice: voice, pace: 1, speech: text }),
    };

    let res = await fetch(url, options);
    let json = await res.json();

    return json.uuid;
}

// gets path to voice file from uuid
function get_path_u(uuid) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const url = `https://api.uberduck.ai/speak-status?uuid=${uuid}`;
            const options = {
                method: "GET",
                headers: { Accept: "application/json" },
            };

            fetch(url, options)
                .then((res) => res.json())
                .then((json) => {
                    if (json.path == null) {
                        get_path_u(uuid).then((path) => {
                            resolve(path);
                        });
                    } else {
                        resolve(json.path);
                    }
                });
        }, 1000);
    });
}

// gets path to voice file from voice and text
async function get_path_vt(voice, text) {
    let uuid = await get_uuid_vt(voice, text);
    let path = await get_path_u(uuid);
    return path;
}

// export get_path_vt function
module.exports.get_path_vt = get_path_vt;
