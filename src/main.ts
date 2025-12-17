import {bootstrapCameraKit} from "@snap/camera-kit";
import { privacyText } from './privacy-text.ts';
(async function (){
  const cameraKit = await bootstrapCameraKit ({
apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzY1Nzk3ODc3LCJzdWIiOiIxZGNiNTc5Ny1lMjVlLTQxMzctOTUwMS1iMDVmMTliMTBmMjZ-U1RBR0lOR345YmYxOGMzOS05MGQ4LTRiOGMtOTkwMS1lZTRlYWYzY2NjNmUifQ.QfyZVF_WYrAmhQhAKx0Bj_i2fb-Y86FctyiBDy-PVBY'
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

const lens = await cameraKit.lensRepository.loadLens('f5e4a493-a928-4eff-88ee-f3f7661b0a8b','9b9f5fbd-8bbe-477a-9e07-e2009d88c232');
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