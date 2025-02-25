import puppeteer from 'puppeteer';
import { Controller, Res } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Response } from 'express';
import { VerifyEmailTpl } from './templates/verify-email.template';
import { join } from 'node:path';
import { randomBytes } from 'node:crypto';
import { readFileSync } from 'fs';
import { render } from '@react-email/components';
import { unlink } from 'node:fs';
// import { html } from './templates/asd';

@Controller('cars')
export class CarsController {
  constructor() {}
  @Get('pdf')
  async asd(@Res() res: Response) {
    const imgBase64 = join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'public',
      '1740292363-3c635b102ecca4141e04e6.jpg',
    );
    const image = 'data:image/jpeg;base64,' + readFileSync(imgBase64, 'base64');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const html = await render(VerifyEmailTpl({ image }));
    const pdfName = randomBytes(10).toString('hex') + '.pdf';
    const pdfPath = join(__dirname, '..', '..', '..', '..', 'temp', pdfName);
    await page.setContent(html);
    await page.pdf({ path: `temp/${pdfName}`, format: 'A4' });
    await browser.close();

    res.sendFile(pdfPath, (err) => {
      if (err) return console.error(err);
      unlink(pdfPath, console.error);
    });
  }
}

/***
 * Useful links:
 * https://stackoverflow.com/questions/46858445/express-js-response-sent-callback
 * https://stackoverflow.com/questions/24523532/how-do-i-convert-an-image-to-a-base64-encoded-data-url-in-sails-js-or-generally
 * https://stackoverflow.com/questions/19065562/add-image-in-pdf-using-jspdf
 * https://stackoverflow.com/questions/64134678/how-to-insert-image-in-the-column-jspdf-autotable
 * https://codepen.io/someatoms/pen/vLYXWB?editors=1010
 **/
