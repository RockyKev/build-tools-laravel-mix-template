(function () {
    'use strict';

    /**
     * Adapted from dunxrion/console.image
     * Original created by Adrian Cooney
     */
    const defaultOpts = {
        printDimension: true,
    };
    /** Extends global console object with a new console.img method */
    const initConsoleLogImg = (opts = defaultOpts) => {
        /**
         * Display an image in the console.
         * @param  {any} source Source of the image: URI, Canvas, ImageBitmap, etc
         * @param  {int} scale Scale factor on the image
         * @return {null}
         */
        console.img = (
        /** Image to print */
        source, 
        /** Scale factor */
        scale = 1, 
        /** When true, prints image dimensions before the image */
        printDimensions = opts.printDimension, 
        /** Extra arguments to be printed before printing the image */
        ...args) => {
            if (source instanceof OffscreenCanvas ||
                source instanceof CanvasRenderingContext2D) {
                printFromCanvas(source, scale, printDimensions, ...args);
            }
            else if (source instanceof ImageBitmap) {
                printFromImageBitmap(source, scale, printDimensions, ...args);
            }
            else if (typeof source === 'string') {
                printFromImageUri(source, scale, printDimensions, ...args);
            }
            else if (source instanceof HTMLImageElement) {
                printFromImageElement(source, scale, printDimensions, ...args);
            }
            else if (source instanceof HTMLCanvasElement) {
                printFromCanvas(source, scale, printDimensions, args);
            }
            else {
                throw new Error('unsupported source type, valid types are: string, Canvas or ImageBitmap');
            }
        };
        const printFromImageUri = (url, scale = 1, printDimensions = opts.printDimension, ...args) => {
            const img = new Image();
            img.onload = () => {
                const imgStyle = getImgStyle(img.width, img.height, scale);
                if (printDimensions) {
                    printImageDimensions(imgStyle);
                }
                if (args.length > 0) {
                    console.log(...args);
                }
                printFromImgStyle(url, imgStyle);
            };
            img.src = url;
            img.style.background = 'url(' + url + ')'; //Preload it again..
        };
        /**
         * Snapshot a canvas context and output it to the console.
         */
        const printFromCanvas = (source, scale = 1, printDimensions = opts.printDimension, ...args) => {
            const canvas = source instanceof CanvasRenderingContext2D ? source.canvas : source;
            const newW = canvas.width * scale;
            const newH = canvas.width * scale;
            let dataUriPromise;
            if (canvas instanceof OffscreenCanvas) {
                const canvasScaled = createOffscreenCanvas({
                    w: newW,
                    h: newH,
                });
                const canvasScaledCtx = canvasScaled.getContext('2d');
                canvasScaledCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, newW, newH);
                dataUriPromise = new Promise((resolve) => canvasScaled.convertToBlob().then((blob) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.addEventListener('load', () => {
                        resolve(reader.result);
                    }, false);
                }));
            }
            else {
                const canvasScaled = createCanvas({ w: newW, h: newH });
                const canvasScaledCtx = canvasScaled.getContext('2d');
                canvasScaledCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, newW, newH);
                dataUriPromise = Promise.resolve(canvasScaled.toDataURL());
            }
            dataUriPromise.then((imageUrl) => {
                const width = canvas.width;
                const height = canvas.height;
                const imgStyle = getImgStyle(width, height, scale);
                if (printDimensions) {
                    printImageDimensions(imgStyle);
                }
                if (args.length > 0) {
                    console.log(...args);
                }
                printFromImgStyle(imageUrl, imgStyle);
            });
        };
        /**
         * Display an image in the console.
         * @param  {string} url The url of the image.
         * @param  {int} scale Scale factor on the image
         * @return {null}
         */
        const printFromImageBitmap = async (bitmap, scale = 1, printDimensions = opts.printDimension, ...args) => {
            const canvas = createCanvas({ w: bitmap.width, h: bitmap.height });
            const ctx = canvas.getContext('bitmaprenderer');
            const bitmap2 = await createImageBitmap(bitmap);
            ctx.transferFromImageBitmap(bitmap2);
            printFromCanvas(ctx.canvas, scale, printDimensions, ...args);
        };
        const printFromImageElement = async (imgEl, scale = 1, printDimensions = opts.printDimension, ...args) => {
            const bitmap = await createImageBitmap(imgEl);
            printFromImageBitmap(bitmap, scale, printDimensions, ...args);
        };
    };
    // Utils
    /** Prints original image dimensions to the console */
    const printImageDimensions = (style) => {
        console.log(`Width = ${style.originalWidth}px, Height = ${style.originalHeight}px`);
    };
    /**
     * Since the console.log doesn't respond to the `display` style,
     * setting a width and height has no effect. In fact, the only styles
     * I've found it responds to is font-size, background-image and color.
     * To combat the image repeating, we have to get a create a font bounding
     * box so to speak with the unicode box characters.
     */
    const getImgStyle = (width, height, scale = 1) => {
        return {
            originalWidth: width,
            originalHeight: height,
            width: width * scale,
            height: height * scale,
            scale,
            string: '+',
            style: 'font-size: 1px; padding: ' +
                Math.floor((height * scale) / 2) +
                'px ' +
                Math.floor((width * scale) / 2) +
                'px; line-height: ' +
                height * scale +
                'px;',
        };
    };
    const printFromImgStyle = (imgUrl, style) => {
        console.log('%c' + style.string, style.style +
            'background-image: url(' +
            imgUrl +
            '); background-size: ' +
            style.width +
            'px ' +
            style.height +
            'px; background-size: 100% 100%; background-repeat: norepeat; color: transparent;');
    };
    const createOffscreenCanvas = (size) => {
        let canvas;
        // @ts-ignore
        if (typeof window === 'undefined' ||
            typeof window.OffscreenCanvas !== 'undefined') {
            // @ts-ignore
            canvas = new OffscreenCanvas(size.w, size.h);
        }
        else {
            // Offscreen canvas isn't supported: fall back to HTML Canvas
            canvas = document.createElement('canvas');
            canvas.style.display = 'none';
        }
        canvas.width = size.w;
        canvas.height = size.h;
        return canvas;
    };
    const createCanvas = (size, elemId) => {
        const canvas = document.createElement('canvas');
        if (elemId != null) {
            canvas.setAttribute('id', `${elemId}`);
        }
        canvas.width = size.w;
        canvas.height = size.h;
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = `${size.w}px`;
        canvas.style.height = `${size.h}px`;
        return canvas;
    };

    // Run this once to initialize the library
    initConsoleLogImg({
      // Optionally, disable image dimensions logging (enabled by default)
      printDimensions: true,
    });

    const consoleImage = '/asset/img/happy-cat.png';

    // Print an image from a URI, at original size
    console.img(consoleImage);

    console.log("im here in library");

    const libElement = document.querySelector('#lib');

    const libImage = libElement.querySelector("img");
    libElement.querySelector("h2");
    const libContent = libElement.querySelector("p");

    libImage.src = consoleImage;
    libContent.innerText = "Everything is working!";

})();
