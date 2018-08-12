class Debug {
    static error(text) {
        console.log('%c ' + text, "color: white; background-color: red; border-radius: 4px;");
    }

    static warn(text) {
        console.log('%c ' + text, "color: black; background-color: yellow; border-radius: 4px;");

    }

    static info(text) {
        console.log('%c ' + text, "color: black; background-color: blue; border-radius: 4px;");
    }
}

class UIJS {
    constructor(callback) {
        var dr = function () {
            var bc = new Container();
            callback(bc);
            document.body.append(bc.getView());
        };
        document.addEventListener('DOMContentLoaded', dr);
    }


    static getColorThemes() {
        // return {
        //     "red":          {backgroundColor: '#FF0020', textColor: "#000000", opacity: 100},
        //     "red-ts":       {backgroundColor: '#FF0020', textColor: "#FF0020", opacity: 17},
        //     "pink":         {backgroundColor: '#FF0048', textColor: "#000000", opacity: 100},
        //     "pink-ts":      {backgroundColor: '#FF0048', textColor: "#FF0048", opacity: 17},
        //     "orange":       {backgroundColor: '#FF9400', textColor: "#000000", opacity: 100},
        //     "orange-ts":    {backgroundColor: '#FF9400', textColor: "#FF9400", opacity: 15},
        //     "yellow":       {backgroundColor: '#F8F400', textColor: "#000000", opacity: 100},
        //     "yellow-ts":    {backgroundColor: '#F8F400', textColor: "#F8F400", opacity: 14},
        //     "green":        {backgroundColor: '#00F070', textColor: "#000000", opacity: 100},
        //     "green-ts":     {backgroundColor: '#00F070', textColor: "#00F070", opacity: 14},
        //     "aqua":         {backgroundColor: '#00FEEB', textColor: "#000000", opacity: 100},
        //     "aqua-ts":      {backgroundColor: '#00FEEB', textColor: "#00FEEB", opacity: 15},
        //     "lessAqua":     {backgroundColor: '#59C2FC', textColor: "#000000", opacity: 100},
        //     "lessAqua-ts":  {backgroundColor: '#59C2FC', textColor: "#59C2FC", opacity: 15},
        //     "blue":         {backgroundColor: '#467CFD', textColor: "#000000", opacity: 100},
        //     "blue-ts":      {backgroundColor: '#467CFD', textColor: "#467CFD", opacity: 17},
        //     "purple":       {backgroundColor: '#8D47FF', textColor: "#000000", opacity: 100},
        //     "purple-ts":    {backgroundColor: '#8D47FF', textColor: "#8D47FF", opacity: 20},
        //     "light":        {backgroundColor: '#F3F2FF', textColor: "#000000", opacity: 100},
        //     "light-ts":     {backgroundColor: '#F3F2FF', textColor: "#F3F2FF", opacity: 14}
        // };

        return {
            "pink": {fg: '255, 255, 255, 1', bg: '255, 59, 48. 1'},
            "pink-ts": {fg: '255, 59, 48, 1', bg: '255, 59, 48. .27'},
            "red": {fg: '255, 255, 255, 1', bg: '250, 17, 79, 1'},
            "red-ts": {fg: '250, 17, 79, 1', bg: '250, 17, 79, .27'},
            "orange": {fg: '255, 255, 255, 1', bg: '255, 149, 0, 1'},
            "orange-ts": {fg: '255, 149, 0, 1', bg: '255, 149, 0, .25'},
            "yellow": {fg: '255, 255, 255, 1', bg: '255, 230, 31, 1'},
            "yellow-ts": {fg: '255, 230, 31, 1', bg: '255, 230, 31, .24'},
            "green": {fg: '255, 255, 255, 1', bg: '4, 222, 113, 1'},
            "green-ts": {fg: '4, 222, 113, 1', bg: '4, 222, 113, .24'},
            "aqua": {fg: '255, 255, 255, 1', bg: '0, 245, 234, 1'},
            "aqua-ts": {fg: '0, 245, 234, 1', bg: '0, 245, 234, .25'},
            "lessAqua": {fg: '255, 255, 255, 1', bg: '90, 200, 250, 1'},
            "lessAqua-ts": {fg: '90, 200, 250, 1', bg: '90, 200, 250, .25'},
            "blue": {fg: '255, 255, 255, 1', bg: '32, 148, 250, 1'},
            "blue-ts": {fg: '32, 148, 250, 1', bg: '32, 148, 250, .27'},
            "purple": {fg: '255, 255, 255, 1', bg: '120, 122, 255, 1'},
            "purple-ts": {fg: '120, 122, 255, 1', bg: '120, 122, 255, .30'},
            "light": {fg: '50, 50, 50, 1', bg: '242, 244, 255, 1'},
            "light-ts": {fg: '242, 244, 255, 1', bg: '242, 244, 255, .24'}
        };
    }

    static getColorTheme(ct) {
        return (this.getColorThemes()[ct] ? this.getColorThemes()[ct] : null);
    }

    static hexToRgbA(hex, opacity) {
        var c;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
            c = hex.substring(1).split('');
            if (c.length == 3) {
                c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c = '0x' + c.join('');
            return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + (opacity) + ')';
        }
        throw new Error('Bad Hex');
    }
}

class View {
    constructor(_name) {
        this.name = _name;
        this.view = document.createElement(_name);
        this.identifier = null;
        this.view.style.transition = "opacity .25s";
    }

    setIdentifier(id) {
        if (id != null) {
            this.identifier = this.name + "__" + id;
            this.view.id = this.identifier;
            return this.identifier;
        } else {
            Debug.error("View.setIdentifier: No 'id' parameter given");
        }
    }

    getIdentifier() {
        return this.identifier;
    }

    getView() {
        return this.view;
    }

    setStyle(sc) {
        if (sc != null) {
            var v = this.view;
            for (var s in sc) {
                this.view.style[s] = sc[s];
            }
        } else {
            Debug.error("View.setStyle: No 'style' parameter given");
        }

        return this;
    }

    addChild(c) {
        if (c != null) {
            this.getView().append(c.getView());
        } else {
            Debug.error("View.addChild: No 'child' parameter given");
        }

        return this;
    }
}

class EditableView extends View {
    constructor(_name) {
        super(_name);
    }

    setText(text) {
        if (text != null) {
            console.log(this.view);
            this.view.innerText = text;
        } else {
            Debug.error("EditableView.setText: No 'text' parameter given");
        }

        return this;
    }

    getText() {
        return this.getView().innerText;
    }
}

class Text extends EditableView {
    constructor(_name) {
        super(_name);
    }
}

class Container extends View {
    constructor() {
        super("container");
    }
}

class Header extends EditableView {
    constructor() {
        super("Header");
    }
}

class Content extends EditableView {
    constructor() {
        super("Content");
    }
}


class Control extends EditableView {
    constructor(_name) {
        super(_name + '-control');

        // TODO: Add parameter errors
    }

    onInteract(event, callback) {
        if (event == "click") {
            this.getView().style.cursor = "pointer";
        }

        this.getView().addEventListener(event, callback);

        return this;
    }
}


class Button extends Control {
    constructor() {
        super("button");
        this.setColorTheme("green");
        // TODO: Add parameter errors
    }

    setColorTheme(t) {
        if (UIJS.getColorThemes()[t] != null) {
            this.getView().style.backgroundColor = 'rgba(' + UIJS.getColorThemes()[t].bg + ')';
            this.getView().style.color = 'rgba(' + UIJS.getColorThemes()[t].fg + ')';
        }

        return this;
    }

}

class Card extends View {
    constructor() {
        super("card");

        this.title = new View("card-title");
        this.view.append(this.title.getView());

        this.content = new View("card-content");
        this.view.append(this.content.getView());
        // TODO: Add parameter errors
    }

    getContentView() {
        return this.content;
    }

    setTitle(t) {
        this.title.getView().innerText = t;
    }
}

class Layout extends View {
    constructor() {
        super("Layout");
        // TODO: Add parameter errors
    }

    addItem(item) {
        if (item.constructor.name == "LayoutItem") {
            this.getView().append(item.getView());
        } else {
            Debug.error("Attempt to add '" + item.constructor.name + "' as LayoutItem to Layout failed");
        }
    }
}

class LayoutItem extends View {
    constructor() {
        super("LayoutItem");

        this.LayoutItemHeader = new Header;
        this.addChild(this.LayoutItemHeader);

        this.LayoutItemBody = new Content;
        console.log(this.LayoutItemBody);

        this.addChild(this.LayoutItemBody);

        // TODO: Add parameter errors
    }

    setColorTheme(t) {
        if (UIJS.getColorThemes()[t] != null) {
            this.getView().style.backgroundColor = 'rgba(' + UIJS.getColorThemes()[t].bg + ')';
            this.getView().style.color = 'rgba(' + UIJS.getColorThemes()[t].fg + ')';
        }

        return this;
    }

    getHeader(){
        return this.LayoutItemHeader;
    }

    getBody(){
        return this.LayoutItemBody;
    }

    addTo(parent){
        parent.addChild(this);

        return this;
    }

}

class ButtonSet extends View {
    constructor() {
        super("ButtonSet");
        // TODO: Add parameter errors
    }

    addButton(button) {
        if (button.constructor.name == "Button") {
            this.getView().append(button.getView());
        } else {
            Debug.error("Attempt to add '" + button.constructor.name + "' as Button to ButtonSet failed");
        }

        return this;
    }

}

class Overlay extends View {
    constructor() {
        super("Overlay");
        // TODO: Add parameter errors

        var bbg = new View("blurred-background");
        var content = new Content;

        this.addChild(bbg);
        this.addChild(content);

        this.view.style.opacity = "0";
        this.view.style.display = "none";
    }

    hide(){
        this.view.style.opacity = "0";
        setTimeout(function () {
            this.view.style.display = "none";
        }, 250);

        return this;
    }

    show(){

        this.view.style.opacity = "1";
        setTimeout(function () {
            this.view.style.display = "block";
        }, 250);

        return this;
    }
}