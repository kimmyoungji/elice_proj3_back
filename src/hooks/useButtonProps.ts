export type ButtonType = 'button' | 'reset' | 'submit';

interface AnchorOptions {
  href?: string;
  rel?: string;
  target?: string;
}

interface UseButtonPropsOptions extends AnchorOptions {
  type?: ButtonType;
  disabled?: boolean;
  tagName?: keyof JSX.IntrinsicElements;
  onClickBtn?: React.EventHandler<React.MouseEvent | React.KeyboardEvent>;
}

export interface UseButtonPropsMetadata {
  tagName: React.ElementType;
}

export function isTrivialHref(href?: string) {
  return !href || href.trim() === '#';
}

export function useButtonProps({
  disabled,
  href,
  target,
  rel,
  onClickBtn,
  tagName,
  type,
}: UseButtonPropsOptions): [UseButtonPropsOptions, UseButtonPropsMetadata] {
  if (!tagName) {
    if (href != null || target != null || rel != null) {
      tagName = 'a';
    } else {
      tagName = 'button';
    }
  }
  const meta: UseButtonPropsMetadata = { tagName };
  if (tagName === 'button') {
    //type: type이 존재하지 않거나 falsy한 경우 'button'이 / 그렇지않으면 type할당
    return [{ type: (type as any) || 'button', disabled }, meta];
  }

  const handleClick = (event: React.MouseEvent | React.KeyboardEvent) => {
    if (disabled || (tagName === 'a' && isTrivialHref(href))) {
      event.preventDefault();
    }

    if (disabled) {
      event.stopPropagation();
      return;
    }

    onClickBtn?.(event);
  };

  if (tagName === 'a') {
    // href가 falsy라면 "#"를 할당
    href ||= '#';
    if (disabled) {
      href = undefined;
    }
  }

  return [
    {
      disabled: undefined,
      href,
      target: tagName === 'a' ? target : undefined,
      rel: tagName === 'a' ? rel : undefined,
      onClickBtn: handleClick,
    },
    meta,
  ];
}
