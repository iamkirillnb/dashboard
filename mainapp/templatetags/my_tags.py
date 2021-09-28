from django import template
from pytz import unicode

register = template.Library()


@register.filter(name='verbose_name')
def verbose_name(obj):
    return obj._meta.verbose_name


@register.filter(name='verbose_name_plural')
def verbose_name_plural(obj):
    return obj._meta.verbose_name_plural

@register.filter(name='encode_me')
def change_code(str):
    return unicode(str, "utf-8")

@register.filter(name='tables')
def bar_chart(values, captions, size='580x100', max_value=None):
    max_value = max_value or max(values)
    return {
        'values': values,
        'captions': captions,
        'size': size,
        'max_value': max_value,
    }