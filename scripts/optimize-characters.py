from pathlib import Path
from urllib.request import Request, urlopen
from PIL import Image
from io import BytesIO

ROOT = Path('/home/ubuntu/webdev-static-assets')
OUT = Path('/home/ubuntu/toonhub-hero/client/public/characters')
OUT.mkdir(parents=True, exist_ok=True)
base = 'https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc'
assets = {
    'figurine-0.png': '1.02464a56.png',
    'figurine-1.png': '2.b977faab.png',
    'figurine-2.png': '3.4df853b4.png',
    'figurine-3.png': '4.4457fbce.png',
}
for output_name, remote_name in assets.items():
    source_path = ROOT / output_name
    if not source_path.exists() or source_path.stat().st_size < 100_000:
        request = Request(f'{base}/{remote_name}', headers={'User-Agent': 'VivuHub asset optimizer'})
        with urlopen(request, timeout=25) as response:
            source_path.write_bytes(response.read())
    with Image.open(source_path) as image:
        image = image.convert('RGBA')
        image.thumbnail((1200, 2000), Image.Resampling.LANCZOS)
        output_path = OUT / output_name.replace('.png', '.webp')
        image.save(output_path, 'WEBP', lossless=False, quality=82, method=6)
        print(f'{output_path.name}: {image.size} -> {output_path.stat().st_size} bytes')
