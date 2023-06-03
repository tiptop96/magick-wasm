// Copyright Dirk Lemstra https://github.com/dlemstra/magick-wasm.
// Licensed under the Apache License, Version 2.0.

import { ErrorMetric } from '../../../src/error-metric';
import { ImageMagick } from '../../../src/image-magick';
import { MagickReadSettings } from '../../../src/settings/magick-read-settings';
import { TestFonts } from '../../test-fonts';

describe('MagickSettings#backgroundColor', () => {
    it('should use the correct background color', () => {
        const settings = new MagickReadSettings();
        settings.font = TestFonts.kaushanScriptRegularTtf.name;

        settings.antiAlias = true;
        ImageMagick.read('label:Test', settings, (imageA) => {
            settings.antiAlias = false;
            ImageMagick.read('label:Test', settings, (imageB) => {
                const distortion = imageA.compare(imageB, ErrorMetric.RootMeanSquared);
                expect(distortion).not.toBe(0);
            });
        });
    });
});
