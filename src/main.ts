import {bootstrapCameraKit} from "@snap/camera-kit";
import { privacyText } from './privacy-text.ts';
(async function (){
  const cameraKit = await bootstrapCameraKit ({
apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzY2MTQyMTU3LCJzdWIiOiI3M2JlNzJlZS1mOGNiLTQyYTYtYTYyZC05YzU4NGQ2Yzc2NTl-U1RBR0lOR35hYjQ3ZTJkZi04MjY0LTRhMjAtYjUxZi1iZDM2OTg4Zjg5M2UifQ.0O20FX1uv750Rkkw-Gt_uJY3wE_zrvGO-d9SDOgcTSQ'
  });

const liveRenderTarget = document.getElementById('canvas') as HTMLCanvasElement;
function resizeCanvas() {
  liveRenderTarget.width = window.innerWidth;
  liveRenderTarget.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
const session = await cameraKit.createSession({liveRenderTarget});
const mediaStream = await navigator.mediaDevices.getUserMedia({
 video: {
  facingMode: 'user'
 } 
})



await session.setSource(mediaStream);
await session.play();

const lens = await cameraKit.lensRepository.loadLens('cf5f8505-c352-40f6-97f9-619a622257fd','9122a956-8499-4e8c-9405-b8a4360c9a94');
await session.applyLens(lens);

}) ();


document.addEventListener('DOMContentLoaded', () => {
  const popup = document.getElementById('helpPopup');
  const btn = document.getElementById('helpButton');
  const close = document.getElementById('closeBtn');

  if (!popup || !btn || !close) return;

  const textDiv = document.querySelector('.popup-text') as HTMLElement;
  if (textDiv) {
    textDiv.innerHTML = privacyText;
  }

  const togglePopup = (open: boolean) => {
    popup.classList.toggle('hidden', !open);
    const url = new URL(window.location.href);
    open ? url.searchParams.set('privacypolicy', '') : url.searchParams.delete('privacypolicy');
    history.pushState({popup: open}, '', url);
  };

  btn.onclick = () => togglePopup(true);
  close.onclick = () => togglePopup(false);
  popup.onclick = e => e.target === popup && togglePopup(false);

  if (new URL(window.location.href).searchParams.has('privacypolicy'))
    togglePopup(true);

  window.onpopstate = () => togglePopup(new URL(window.location.href).searchParams.has('privacypolicy'));
});