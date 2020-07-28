const textBox = document.getElementById("input");
const toYarn = document.getElementById("toYarn");
const toMCP = document.getElementById("toMCP");
const responseLabel = document.getElementById("responseLabel");

const mappings = [];

// constructor
mappings.push({yarn: "ModelPart", mcp: "ModelRenderer"});
mappings.push({yarn: "setPivot", mcp: "setRotationPoint"});
mappings.push({yarn: "addCuboid", mcp: "addBox"});

// setRotationAngles <--> setAngles
mappings.push({yarn: "setAngles", mcp: "setRotationAngles"});
mappings.push({yarn: "limbAngle", mcp: "limbSwing"});
mappings.push({yarn: "limbDistance", mcp: "limbSwingAmount"});
mappings.push({yarn: "animationProgress", mcp: "ageInTicks"});
mappings.push({yarn: "headYaw", mcp: "netHeadYaw"});

// render
mappings.push({yarn: "VertexConsumer", mcp: "IVertexBuilder"});
mappings.push({yarn: "vertexConsumer", mcp: "buffer"});
mappings.push({yarn: "light", mcp: "packedLight"});
mappings.push({yarn: "overlay", mcp: "packedOverlay"});

// setRotationAngle
mappings.push({yarn: "modelPart", mcp: "modelRenderer"});
mappings.push({yarn: "pivotX", mcp: "rotateAngleX"});
mappings.push({yarn: "pivotY", mcp: "rotateAngleY"});
mappings.push({yarn: "pivotZ", mcp: "rotateAngleZ"});

toYarn.addEventListener('click', (element, event) => {
    map('mcp', 'yarn');
});

toMCP.addEventListener('click', (element, event) => {
    map('yarn', 'mcp');
});

function map(from, to) {
    var currentValue = textBox.value;

    if(currentValue === "") {
        warnEmpty();
    } else {
        // map
        mappings.forEach(mappingSet => {
            currentValue = currentValue.replace(new RegExp(mappingSet[from], 'g'), mappingSet[to]);
        });

        // remove blockbench comments
        currentValue = currentValue.replace('// Made with Blockbench 3.6.5', '');
        currentValue = currentValue.replace('// Exported for Minecraft version 1.15', '');
        currentValue = currentValue.replace('// Paste this class into your mod and generate all required imports', '');

        // todo: add imports?

        // finish
        textBox.value = currentValue;
        printSuccess();
    }
}

function warnEmpty() {
    responseLabel.innerHTML = "Log was empty! Try pasting something in before converting.";
    responseLabel.style.color = 'red';
    fadeResponseLabel();
}

/**
 * Configures the response label to say "Success!" with a green color.
 * After setting the label, it is faded in and out.
 */
function printSuccess() {
    responseLabel.innerHTML = "Success!";
    responseLabel.style.color = 'green';
    fadeResponseLabel();
}

/**
 * Fades the response label with the given opacity amount.
 * If the passed in amount is not defined, the label is set to 100 (max opacity).
 * If the label is set to max opacity, it is faded out to 0 after 5 seconds.
 * 
 * @param {Number} amount  opacity to set the label to, from 0 to 100
 */
function fadeResponseLabel(amount) {
    // "default" amount parameter
    if(amount === undefined) {
        amount = 100;
    }

    responseLabel.style.opacity = amount;

    // if the amount passed in was 100 (max opacity), queue up a fade back to 0 opacity in 2 seconds
    if(amount === 100) {
        setTimeout(() => {
            fadeResponseLabel(0);
        }, 5000);
    }
}