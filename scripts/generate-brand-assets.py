from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
ICONS = PUBLIC / "icons"
ICONS.mkdir(parents=True, exist_ok=True)

BG_TOP = (18, 35, 63, 255)
BG_BOTTOM = (10, 25, 49, 255)
ACCENT = (12, 123, 163, 255)
ACCENT_SOFT = (63, 188, 224, 255)
WARM = (215, 164, 65, 255)
WHITE = (245, 249, 255, 255)
MUTED = (186, 202, 222, 255)


def load_font(size: int, bold: bool = False):
    candidates = [
        "C:/Windows/Fonts/seguisb.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf",
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
    ]
    for candidate in candidates:
        path = Path(candidate)
        if path.exists():
            return ImageFont.truetype(str(path), size=size)
    return ImageFont.load_default()


def measure_text(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.ImageFont):
    left, top, right, bottom = draw.textbbox((0, 0), text, font=font)
    return right - left, bottom - top


def draw_wrapped_text(draw: ImageDraw.ImageDraw, text: str, font, fill, origin, max_width: int, line_gap: int = 8):
    words = text.split()
    lines: list[str] = []
    current = ""

    for word in words:
        candidate = f"{current} {word}".strip()
        candidate_width, _ = measure_text(draw, candidate, font)
        if current and candidate_width > max_width:
            lines.append(current)
            current = word
        else:
            current = candidate

    if current:
        lines.append(current)

    x, y = origin
    for line in lines:
        draw.text((x, y), line, font=font, fill=fill)
        _, line_height = measure_text(draw, line, font)
        y += line_height + line_gap

    return y


def vertical_gradient(size: int):
    image = Image.new("RGBA", (size, size), BG_TOP)
    pixels = image.load()
    for y in range(size):
        ratio = y / max(size - 1, 1)
        color = tuple(
            int(BG_TOP[channel] * (1 - ratio) + BG_BOTTOM[channel] * ratio)
            for channel in range(4)
        )
        for x in range(size):
            pixels[x, y] = color
    return image


def add_glow(base: Image.Image, center, radius, color, blur):
    layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    x, y = center
    draw.ellipse((x - radius, y - radius, x + radius, y + radius), fill=color)
    layer = layer.filter(ImageFilter.GaussianBlur(blur))
    base.alpha_composite(layer)


def draw_brand_icon(size: int, badge_text: str | None = None, maskable: bool = False):
    image = vertical_gradient(size)
    add_glow(image, (int(size * 0.2), int(size * 0.18)), int(size * 0.25), (12, 123, 163, 70), int(size * 0.1))
    add_glow(image, (int(size * 0.78), int(size * 0.78)), int(size * 0.22), (215, 164, 65, 42), int(size * 0.08))

    draw = ImageDraw.Draw(image)
    margin = int(size * (0.10 if maskable else 0.14))
    panel_radius = int(size * 0.18)
    panel_box = (margin, margin, size - margin, size - margin)
    draw.rounded_rectangle(panel_box, radius=panel_radius, fill=(14, 36, 66, 235), outline=(82, 188, 224, 190), width=max(2, size // 38))

    line_width = max(2, size // 48)
    draw.line((size * 0.28, size * 0.36, size * 0.52, size * 0.28), fill=(82, 188, 224, 180), width=line_width)
    draw.line((size * 0.52, size * 0.28, size * 0.72, size * 0.44), fill=(82, 188, 224, 180), width=line_width)
    draw.line((size * 0.30, size * 0.64, size * 0.52, size * 0.54), fill=(215, 164, 65, 170), width=line_width)
    for cx, cy, color in [
        (0.28, 0.36, ACCENT_SOFT),
        (0.52, 0.28, ACCENT_SOFT),
        (0.72, 0.44, ACCENT),
        (0.30, 0.64, WARM),
        (0.52, 0.54, WARM),
    ]:
        radius = max(4, size // 26)
        draw.ellipse(
            (
                int(size * cx) - radius,
                int(size * cy) - radius,
                int(size * cx) + radius,
                int(size * cy) + radius,
            ),
            fill=color,
        )

    font_main = load_font(int(size * 0.28), bold=True)
    draw.text((size * 0.5, size * 0.56), "P4", font=font_main, fill=WHITE, anchor="mm")

    if size >= 128:
        font_label = load_font(int(size * 0.08), bold=True)
        draw.text((size * 0.5, size * 0.78), "PDDE • 4ª CRE", font=font_label, fill=MUTED, anchor="mm")

    if badge_text:
        badge_font = load_font(int(size * 0.10), bold=True)
        badge_w = int(size * 0.28)
        badge_h = int(size * 0.14)
        badge_box = (int(size * 0.58), int(size * 0.14), int(size * 0.58) + badge_w, int(size * 0.14) + badge_h)
        draw.rounded_rectangle(badge_box, radius=int(size * 0.07), fill=(12, 123, 163, 235))
        draw.text((badge_box[0] + badge_w / 2, badge_box[1] + badge_h / 2), badge_text, font=badge_font, fill=WHITE, anchor="mm")

    return image


def make_og_image():
    width, height = 1200, 630
    image = Image.new("RGBA", (width, height), BG_TOP)
    pixels = image.load()
    for y in range(height):
        ratio = y / max(height - 1, 1)
        color = tuple(
            int(BG_TOP[channel] * (1 - ratio) + BG_BOTTOM[channel] * ratio)
            for channel in range(4)
        )
        for x in range(width):
            pixels[x, y] = color

    add_glow(image, (180, 120), 180, (12, 123, 163, 85), 55)
    add_glow(image, (1040, 520), 160, (215, 164, 65, 45), 60)
    draw = ImageDraw.Draw(image)

    for offset in range(0, 560, 56):
        draw.line((0, 90 + offset, 560, 40 + offset), fill=(82, 188, 224, 28), width=2)
    for offset in range(0, 360, 46):
        draw.line((640 + offset, 0, 880 + offset, 630), fill=(82, 188, 224, 18), width=2)

    title_font = load_font(66, bold=True)
    subtitle_font = load_font(28, bold=True)
    body_font = load_font(25, bold=False)
    credit_font = load_font(20, bold=False)

    draw.text((78, 92), "Guia PDDE no SEI!RIO", font=title_font, fill=WHITE)
    draw.text((80, 182), "4ª CRE • prestação de contas com identidade própria", font=subtitle_font, fill=(106, 206, 236, 255))
    next_y = draw_wrapped_text(
        draw,
        "Checklist, apoio operacional, handoff, rastreabilidade das fontes e experiência instalável como aplicativo.",
        font=body_font,
        fill=MUTED,
        origin=(80, 252),
        max_width=560,
        line_gap=10,
    )
    draw_wrapped_text(
        draw,
        "Com assinatura autoral e identidade visual própria em downloads, PDF e atalhos.",
        font=body_font,
        fill=(214, 223, 235, 255),
        origin=(80, next_y + 24),
        max_width=560,
        line_gap=10,
    )
    draw.text((80, 548), "Projeto criado por Wilson M. Peixoto • identidade visual e produto digital protegidos.", font=credit_font, fill=(214, 223, 235, 255))

    icon = draw_brand_icon(360)
    image.alpha_composite(icon, (780, 126))
    return image


def make_manifest_screenshot(size: tuple[int, int], compact: bool = False):
    width, height = size
    image = Image.new("RGBA", (width, height), BG_TOP)
    pixels = image.load()
    for y in range(height):
        ratio = y / max(height - 1, 1)
        color = tuple(
            int(BG_TOP[channel] * (1 - ratio) + BG_BOTTOM[channel] * ratio)
            for channel in range(4)
        )
        for x in range(width):
            pixels[x, y] = color

    add_glow(image, (int(width * 0.18), int(height * 0.16)), int(min(width, height) * 0.18), (12, 123, 163, 80), int(min(width, height) * 0.08))
    add_glow(image, (int(width * 0.82), int(height * 0.8)), int(min(width, height) * 0.16), (215, 164, 65, 42), int(min(width, height) * 0.07))
    draw = ImageDraw.Draw(image)

    draw.rounded_rectangle(
        (int(width * 0.06), int(height * 0.06), int(width * 0.94), int(height * 0.94)),
        radius=int(min(width, height) * 0.05),
        fill=(13, 30, 55, 220),
        outline=(82, 188, 224, 55),
        width=max(2, min(width, height) // 160),
    )

    nav_h = int(height * (0.11 if compact else 0.095))
    draw.rounded_rectangle(
        (int(width * 0.085), int(height * 0.09), int(width * 0.915), int(height * 0.09) + nav_h),
        radius=int(nav_h * 0.35),
        fill=(18, 43, 74, 225),
    )

    brand_font = load_font(int(min(width, height) * (0.045 if compact else 0.042)), bold=True)
    meta_font = load_font(int(min(width, height) * (0.022 if compact else 0.02)), bold=False)
    draw.text((int(width * 0.11), int(height * 0.09) + nav_h // 2), "Guia PDDE no SEI!RIO", font=brand_font, fill=WHITE, anchor="lm")
    draw.text((int(width * 0.84), int(height * 0.09) + nav_h // 2), "PWA", font=meta_font, fill=(106, 206, 236, 255), anchor="mm")

    icon_size = int(min(width, height) * (0.16 if compact else 0.22))
    icon = draw_brand_icon(icon_size)
    icon_position = (int(width * 0.11), int(height * 0.2))
    if compact:
        icon_position = (int(width * 0.6), int(height * 0.34))
    image.alpha_composite(icon, icon_position)

    title_font = load_font(int(min(width, height) * (0.052 if compact else 0.048)), bold=True)
    text_font = load_font(int(min(width, height) * (0.028 if compact else 0.022)), bold=False)
    badge_font = load_font(int(min(width, height) * (0.02 if compact else 0.018)), bold=True)
    content_x = int(width * (0.1 if compact else 0.38))
    content_y = int(height * (0.23 if compact else 0.23))

    draw.text((content_x, content_y), "Ferramenta pronta para usar", font=title_font, fill=WHITE)
    next_y = draw_wrapped_text(
        draw,
        "Checklist, central operacional, handoff, retomada de leitura e referências oficiais rastreadas.",
        font=text_font,
        fill=MUTED,
        origin=(content_x, content_y + int(height * 0.08)),
        max_width=int(width * (0.44 if compact else 0.44)),
        line_gap=int(height * 0.012),
    )

    badges = [
        "Ícone próprio",
        "Instalável no celular",
        "Instalável no Windows",
        "Exportações assinadas",
    ]
    badge_y = next_y + int(height * 0.035)
    badge_x = content_x
    for badge in badges:
        text_width, text_height = measure_text(draw, badge, badge_font)
        pad_x = int(width * 0.012)
        pad_y = int(height * 0.008)
        box = (
            badge_x,
            badge_y,
            badge_x + text_width + pad_x * 2,
            badge_y + text_height + pad_y * 2,
        )
        draw.rounded_rectangle(box, radius=int(text_height * 0.75), fill=(12, 123, 163, 45), outline=(82, 188, 224, 110))
        draw.text((badge_x + pad_x, badge_y + pad_y), badge, font=badge_font, fill=(214, 223, 235, 255))
        badge_y = box[3] + int(height * 0.015 if compact else height * 0.012)

    panel_specs = [
        ("Central operacional", 0.14, 0.61, 0.33, 0.18),
        ("Resumo de handoff", 0.50, 0.61, 0.22, 0.18),
        ("Fontes oficiais", 0.74, 0.61, 0.13, 0.18),
    ]
    if compact:
        panel_specs = [
            ("Central operacional", 0.1, 0.7, 0.8, 0.11),
            ("Resumo de handoff", 0.1, 0.825, 0.8, 0.09),
        ]

    card_title_font = load_font(int(min(width, height) * 0.022), bold=True)
    card_text_font = load_font(int(min(width, height) * 0.016), bold=False)
    for title, x_ratio, y_ratio, w_ratio, h_ratio in panel_specs:
        left = int(width * x_ratio)
        top = int(height * y_ratio)
        right = int(width * (x_ratio + w_ratio))
        bottom = int(height * (y_ratio + h_ratio))
        draw.rounded_rectangle((left, top, right, bottom), radius=int(min(width, height) * 0.025), fill=(18, 43, 74, 230), outline=(82, 188, 224, 55))
        draw.text((left + 18, top + 16), title, font=card_title_font, fill=WHITE)
        draw_wrapped_text(
            draw,
            "Apoio direto ao processo com autoria preservada e visual próprio do projeto.",
            font=card_text_font,
            fill=MUTED,
            origin=(left + 18, top + 48),
            max_width=max(120, right - left - 36),
            line_gap=6,
        )

    footer_font = load_font(int(min(width, height) * 0.018), bold=False)
    draw.text((int(width * 0.11), int(height * 0.91)), "Projeto criado por Wilson M. Peixoto", font=footer_font, fill=(214, 223, 235, 255))
    return image


def save_icon_set():
    icon_512 = draw_brand_icon(512)
    icon_192 = draw_brand_icon(192)
    icon_maskable_512 = draw_brand_icon(512, maskable=True)
    icon_maskable_192 = draw_brand_icon(192, maskable=True)
    apple_touch = draw_brand_icon(180)
    shortcut_home = draw_brand_icon(192, badge_text="IN")
    shortcut_checklist = draw_brand_icon(192, badge_text="CK")
    shortcut_workspace = draw_brand_icon(192, badge_text="OP")
    mstile = draw_brand_icon(150)
    favicon_png = draw_brand_icon(512)
    favicon_32 = draw_brand_icon(32)
    favicon_16 = draw_brand_icon(16)
    screenshot_desktop = make_manifest_screenshot((1280, 720))
    screenshot_mobile = make_manifest_screenshot((720, 1280), compact=True)

    icon_512.save(ICONS / "icon-512.png")
    icon_192.save(ICONS / "icon-192.png")
    icon_maskable_512.save(ICONS / "icon-maskable-512.png")
    icon_maskable_192.save(ICONS / "icon-maskable-192.png")
    apple_touch.save(ICONS / "apple-touch-icon.png")
    shortcut_home.save(ICONS / "shortcut-home.png")
    shortcut_checklist.save(ICONS / "shortcut-checklist.png")
    shortcut_workspace.save(ICONS / "shortcut-workspace.png")
    mstile.save(ICONS / "mstile-150x150.png")
    favicon_png.save(PUBLIC / "favicon.png")
    favicon_32.save(ICONS / "favicon-32.png")
    favicon_16.save(ICONS / "favicon-16.png")
    screenshot_desktop.save(ICONS / "install-desktop.png")
    screenshot_mobile.save(ICONS / "install-mobile.png")
    favicon_png.save(PUBLIC / "favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
    make_og_image().save(PUBLIC / "og-image.png")


if __name__ == "__main__":
    save_icon_set()
    print("Ativos de identidade visual gerados em public/ e public/icons/.")
