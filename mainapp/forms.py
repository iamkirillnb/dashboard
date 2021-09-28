from django import forms
from django.contrib.auth.models import User
from django.utils.encoding import force_text

from .models import IndicatorModel


class IndicatorForm(forms.Form):
    indicator_field = forms.ModelMultipleChoiceField(
        queryset=IndicatorModel.objects.all(),
        widget=forms.CheckboxSelectMultiple,
        required=False,
    )

    def __init__(self, *args, **kwargs):
        super(IndicatorForm, self).__init__(*args, **kwargs)
        self.fields['indicator_field'].label = ""
        self.fields['indicator_field'].help_text = None
        # for field_name, filed in self.fields.items():
        #     filed.widget.attrs['class'] = 'form-checkbox'




