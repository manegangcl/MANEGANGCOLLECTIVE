from PyQt6.QtWidgets import QApplication, QWidget, QVBoxLayout, QLabel, QLineEdit, QPushButton, QFileDialog
import sys

class RedirectPageGenerator(QWidget):
    def __init__(self):
        super().__init__()
        self.init_ui()

    def init_ui(self):
        self.setWindowTitle("redirect generator")
        self.setGeometry(300, 300, 400, 150)

        layout = QVBoxLayout()

        self.label = QLabel("enter the url to redirect to:")
        layout.addWidget(self.label)

        self.url_input = QLineEdit(self)
        layout.addWidget(self.url_input)

        self.generate_button = QPushButton("generate", self)
        self.generate_button.clicked.connect(self.generate_redirect_page)
        layout.addWidget(self.generate_button)

        self.setLayout(layout)

    def generate_redirect_page(self):
        url = self.url_input.text()

        if url:
            html_content = f"""
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>...</title>
    <script>
        window.location.href = "{url}";
    </script>
</head>

<body>
    <p>follow this <a href="{url}">link</a>.</p>
</body>

</html>
"""
            options = QFileDialog.Options()
            options |= QFileDialog.Option.DontUseNativeDialog
            directory = QFileDialog.getExistingDirectory(self, "select directory", options=options)

            if directory:
                with open(f"{directory}/index.html", "w") as file:
                    file.write(html_content)
                self.label.setText("success")
            else:
                self.label.setText("pick a directory")
        else:
            self.label.setText("enter a url")

def main():
    app = QApplication(sys.argv)
    generator = RedirectPageGenerator()
    generator.show()
    sys.exit(app.exec())

if __name__ == '__main__':
    main()