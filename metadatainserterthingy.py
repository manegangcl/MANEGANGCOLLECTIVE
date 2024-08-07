import sys
from PyQt6.QtWidgets import (
    QApplication, QWidget, QVBoxLayout, QLabel, QPushButton, QFileDialog,
    QLineEdit, QTextEdit, QFormLayout, QMessageBox
)
from PyQt6.QtCore import Qt

class MetadataEditor(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("l0xd8 funny html meta editor haha")

        self.layout = QVBoxLayout()

        self.form_layout = QFormLayout()
        self.title_input = QLineEdit()
        self.description_input = QLineEdit()
        self.image_input = QLineEdit()
        self.url_input = QLineEdit()

        self.form_layout.addRow(QLabel("title:"), self.title_input)
        self.form_layout.addRow(QLabel("description:"), self.description_input)
        self.form_layout.addRow(QLabel("image url:"), self.image_input)
        self.form_layout.addRow(QLabel("page url:"), self.url_input)

        self.layout.addLayout(self.form_layout)

        self.load_button = QPushButton("load html file")
        self.load_button.clicked.connect(self.load_html)
        self.layout.addWidget(self.load_button)

        self.save_button = QPushButton("save metadata")
        self.save_button.clicked.connect(self.save_metadata)
        self.layout.addWidget(self.save_button)

        self.setLayout(self.layout)

        self.html_content = ""

    def load_html(self):
        file_name, _ = QFileDialog.getOpenFileName(self, "open html file", "", "HTML Files (*.html *.htm)")
        if file_name:
            with open(file_name, "r", encoding="utf-8") as file:
                self.html_content = file.read()
                self.extract_metadata()

    def extract_metadata(self):
        title = self.extract_tag("og:title")
        description = self.extract_tag("og:description")
        image = self.extract_tag("og:image")
        url = self.extract_tag("og:url")

        self.title_input.setText(title)
        self.description_input.setText(description)
        self.image_input.setText(image)
        self.url_input.setText(url)

    def extract_tag(self, tag_name):
        start_tag = f'<meta property="{tag_name}" content="'
        start_index = self.html_content.lower().find(start_tag.lower())
        if start_index == -1:
            return ""
        start_index += len(start_tag)
        end_index = self.html_content.find('"', start_index)
        return self.html_content[start_index:end_index]

    def save_metadata(self):
        title = self.title_input.text().strip().lower()
        description = self.description_input.text().strip().lower()
        image = self.image_input.text().strip().lower()
        url = self.url_input.text().strip().lower()

        if not any([title, description, image, url]):
            QMessageBox.warning(self, "error", "please put at least one field to save.")
            return

        new_metadata = []
        if title:
            new_metadata.append(f'<meta property="og:title" content="{title}">')
        if description:
            new_metadata.append(f'<meta property="og:description" content="{description}">')
        if image:
            new_metadata.append(f'<meta property="og:image" content="{image}">')
        if url:
            new_metadata.append(f'<meta property="og:url" content="{url}">')

        head_end_index = self.html_content.lower().find('</head>')
        if head_end_index != -1:
            self.html_content = (
                self.html_content[:head_end_index] + "\n" + "\n".join(new_metadata) + "\n" +
                self.html_content[head_end_index:]
            )
        
        file_name, _ = QFileDialog.getSaveFileName(self, "save html file", "", "HTML Files (*.html *.htm)")
        if file_name:
            with open(file_name, "w", encoding="utf-8") as file:
                file.write(self.html_content)
                QMessageBox.information(self, "success", "metadata saved successfully.")

if __name__ == "__main__":
    app = QApplication(sys.argv)
    editor = MetadataEditor()
    editor.show()
    sys.exit(app.exec())